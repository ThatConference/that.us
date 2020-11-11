import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';
import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';

function createServices(client) {
  const { queryCommunityFollowers } = communityQueryApi(client);

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: context => queryCommunityFollowers(context.meta.id),
      loadNext: context => queryCommunityFollowers(context.meta.id),
    },

    actions: {
      logError: (context, event) =>
        log({
          error:
            'communities followers state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'followers' },
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
