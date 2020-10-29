import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import partnersApi from '../../../dataSources/api.that.tech/partner/queries';
import pagingMachine from '../../../machines/paging';

function createServices() {
  const { get, getNext } = partnersApi(getClient());

  return {
    guards: {
      hasMore: (_, event) => event.data !== null,
    },

    services: {
      load: () => get(),
      loadNext: context => getNext(context.cursor), // todo stubbed until we have paged partners
    },

    actions: {
      logError: (context, event) => console.error({ context, event }),

      loadSuccess: assign({
        items: (_, { data }) => data,
        cursor: (_, { data }) => undefined, // todo add once we have paged partners
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
