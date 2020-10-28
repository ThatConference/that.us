import { getClient } from '@urql/svelte';

import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';
import pagingMachine from '../../../machines/paging';

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
        hasMore: (_, { data }) => true,
      }),

      // todo... we add to the object
      loadNextSuccess: assign({
        items: (context, event) =>
          uniqBy([...context.items, ...event.data.members], i => i.id),
        cursor: (_, { data }) => data.cursor,
      }),
    },
  };
}

function create() {
  const services = createServices();

  return Machine({ ...pagingMachine }, { ...services });
}

export default create;
