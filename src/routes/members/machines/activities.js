import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';
import membersQueryApi from '../../../dataSources/api.that.tech/members/queries';

function createServices(client) {
  const { queryMemberActivities, queryNextMemberActivities } = membersQueryApi(
    client,
  );

  return {
    guards: {
      hasMore: (_, { data }) => data.count > 0,
    },

    services: {
      load: context => queryMemberActivities(context.meta.profileSlug),

      loadNext: context =>
        queryNextMemberActivities({
          id: context.meta.profileSlug,
          cursor: context.cursor,
        }),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'member activities state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'members' },
        }),

      loadSuccess: assign({
        items: (_, { data }) => data.filter(i => i !== null),
        cursor: (_, { data }) => undefined,
      }),

      loadNextSuccess: assign({
        items: (_, { data }) => data.filter(i => i !== null),
        cursor: (_, { data }) => undefined,
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
