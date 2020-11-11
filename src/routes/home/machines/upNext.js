import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';
import sessionsApi from '../../../dataSources/api.that.tech/sessions';

function createServices(client) {
  const { queryNextSessionsByDate, querySessionsByDate } = sessionsApi(client);

  return {
    guards: {
      hasMore: (_, { data }) => data !== null && data.sessions.length > 0,
    },

    services: {
      load: context =>
        querySessionsByDate({ eventId: context.meta.id, pageSize: 6 }),
      loadNext: context =>
        queryNextSessionsByDate({
          eventId: context.meta.id,
          pageSize: 6,
          cursor: context.cursor,
        }),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'home upnext state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'upnext' },
        }),

      loadSuccess: assign({
        items: (_, { data }) => data.sessions,
        cursor: (_, { data }) => data.cursor,
      }),

      loadNextSuccess: assign({
        items: (context, { data }) => data.sessions,
        cursor: (_, { data }) => data.cursor,
      }),

      loadedAllSuccess: assign({
        items: () => [],
        cursor: () => undefined,
      }),
    },
  };
}

function create(meta, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...createPagingConfig(meta) }, { ...services });
}

export default create;
