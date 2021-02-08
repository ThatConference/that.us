import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import { log } from '../../../utilities/error';
import createPagingConfig from '../../../machines/paging';
import ordersApi from '../../../dataSources/api.that.tech/orders/queries';

function createServices() {
  const { queryMyOrders, queryMyOrdersNext } = ordersApi(getClient());

  return {
    guards: {
      hasMore: (_, { data }) => data.count !== 0,
    },

    services: {
      load: () => queryMyOrders(),
      loadNext: context => queryMyOrdersNext(context.cursor),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'order history state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'orderHistory' },
        }),

      // todo: will need to add the correct data structure once we have paged communities
      loadSuccess: assign({
        items: (_, { data }) => data.orders,
        cursor: (_, { data }) => data.cursor,
        count: (_, { data }) => data.count,
      }),

      loadNextSuccess: assign({
        items: (context, { data }) =>
          uniqBy([...context.items, ...data.orders], i => i.id),
        cursor: (_, { data }) => data.cursor,
        count: (_, { data }) => data.count,
      }),
    },
  };
}

function create() {
  const services = createServices();
  return Machine({ ...createPagingConfig() }, { ...services });
}

export default create;
