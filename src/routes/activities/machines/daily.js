import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import config from '../../../config';
import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';

import sessionsApi from '../../../dataSources/api.that.tech/sessions';

function createServices() {
  const { querySessionsByDate, queryNextSessions } = sessionsApi(getClient());

  return {
    guards: {
      hasMore: (_, { data }) => data.count !== 0,
    },

    services: {
      load: () => querySessionsByDate({ pageSize: 100 }),
      loadNext: context => queryNextSessions({ cursor: context.cursor }),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'daily activities state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'Daily Activities' },
        }),

      // todo: will need to add the correct data structure once we have paged communities
      loadSuccess: assign({
        items: (_, { data }) => data.sessions.filter(s => s),
        cursor: (_, { data }) => data.cursor,
        count: (_, { data }) => data.count,
        events: (context, { data: { sessions } }) =>
          uniqBy(
            [...context.events, ...sessions.filter(s => s).map(e => e.event)],
            i => i.id,
          ),
      }),

      loadNextSuccess: assign({
        items: (context, { data }) =>
          uniqBy(
            [...context.items, ...data.sessions.filter(s => s)],
            i => i.id,
          ),
        events: (context, { data: { sessions } }) =>
          uniqBy(
            [...context.events, ...sessions.filter(s => s).map(e => e.event)],
            i => i.id,
          ),
        cursor: (_, { data }) => data.cursor,
        count: (_, { data }) => data.count,
      }),
    },
  };
}

function create() {
  const services = createServices();
  return Machine(
    { ...createPagingConfig({ eventId: config.eventId, events: [] }) },
    { ...services },
  );
}

export default create;
