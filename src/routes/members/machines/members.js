import { getClient } from '@urql/svelte';

import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';
import createPagingConfig from '../../../machines/paging';

import membersApi from '../../../dataSources/api.that.tech/members/queries';

function createServices() {
  const { queryMembers, queryMembersNext } = membersApi(getClient());

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: () => queryMembers(),
      loadNext: context => queryMembersNext(context.cursor),
    },

    actions: {
      logError: (context, event) => console.error({ context, event }),

      loadSuccess: assign({
        items: (_, { data }) => data.members,
        cursor: (_, { data }) => data.cursor,
      }),

      // todo... we add to the object
      loadNextSuccess: assign({
        items: (context, event) =>
          uniqBy([...context.items, ...event.data.members], i => i.id),
        cursor: (_, { data }) => data.cursor,
      }),

      loadedAllSuccess: () => {}, // stub action for now.
    },
  };
}

function create() {
  const services = createServices();
  return Machine({ ...createPagingConfig() }, { ...services });
}

export default create;
