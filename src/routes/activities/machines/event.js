import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';
import dayjs from 'dayjs';

import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';
import sessionsApi from '../../../dataSources/api.that.tech/sessions';

function createServices() {
  const { querySessionsBySlug, queryNextSessions } = sessionsApi(getClient());

  return {
    guards: {
      hasMore: (_, { data }) => data.count !== 0,
    },

    services: {
      load: context => querySessionsBySlug(context.eventSlug),
      loadNext: context =>
        queryNextSessions({ eventId: context.eventId, cursor: context.cursor }),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'events activities state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'Events Activities' },
        }),

      // todo: will need to add the correct data structure once we have paged communities
      loadSuccess: assign({
        eventId: (_, { data }) => data.id,
        name: (_, { data }) => data.name,
        hasEnded: (_, { data }) => dayjs(data.endDate).isBefore(dayjs(), 'day'),
        items: (_, { data: { sessions } }) => sessions.sessions.filter(s => s),
        cursor: (_, { data: { sessions } }) => sessions.cursor,
        count: (_, { data: { sessions } }) => sessions.count,
      }),

      loadNextSuccess: assign({
        items: (context, { data }) =>
          uniqBy(
            [...context.items, ...data.sessions.filter(s => s)],
            i => i.id,
          ),
        cursor: (_, { data }) => data.cursor,
        count: (_, { data }) => data.count,
      }),
    },
  };
}

function create(eventSlug) {
  const services = createServices();
  return Machine(
    { ...createPagingConfig({ eventSlug, hasEnded: true }) },
    { ...services },
  );
}

export default create;
