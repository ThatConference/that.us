import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';
import partnerQueryApi from '../../../dataSources/api.that.tech/partner/queries';

function createServices(client) {
  const { queryFollowers, queryNextFollowers } = partnerQueryApi(client);

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: context => queryFollowers(context.meta.id),
      loadNext: context => queryNextFollowers(context.meta.id, context.cursor),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'partners followers state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'partners' },
        }),

      loadSuccess: assign({
        items: (_, { data: { followers } }) => followers.members,
        cursor: (_, { data: { followers } }) => followers.cursor,
      }),

      loadNextSuccess: assign({ items: (_, event) => event.data }),

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
