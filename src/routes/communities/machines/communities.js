import { getClient } from '@urql/svelte';

import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';
import createPagingConfig from '../../../machines/paging';

import communitiesApi from '../../../dataSources/api.that.tech/community/queries';

function createServices() {
  const { queryNextAllCommunities, queryAllCommunities } = communitiesApi(
    getClient(),
  );

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: () => queryAllCommunities(),
      loadNext: context => queryNextAllCommunities(context.cursor),
    },

    actions: {
      logError: (context, event) => console.error({ context, event }),

      // todo: will need to add the correct data structure once we have paged communities
      loadSuccess: assign({
        items: (_, { data }) => data,
        cursor: (_, { data }) => undefined,
      }),

      loadNextSuccess: assign({
        items: (context, event) =>
          uniqBy([...context.items, ...event.data.communities], i => i.id),
        cursor: (_, { data }) => data.cursor,
      }),
    },
  };
}

function create() {
  const services = createServices();
  return Machine({ ...createPagingConfig() }, { ...services });
}

export default create;
