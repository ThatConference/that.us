import { Machine, assign } from 'xstate';
import { getClient } from '@urql/svelte';

import createConfig from './pricingConfig';
import productsQueryApi from '../../../dataSources/api.that.tech/products/queries';
import { log } from '../../../utilities/error';

function createServices() {
  const { queryProductsByEvent } = productsQueryApi(getClient());

  return {
    guards: {},
    services: {
      queryProducts: context => queryProductsByEvent(context.eventId),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'pricing parent state machine has ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'pricing' },
        }),

      queryProductsSuccess: assign({
        eventTicket: (_, { data }) =>
          data.find(element => element.productType === 'TICKET'),
        membership: (_, { data }) =>
          data.find(element => element.productType === 'MEMBERSHIP'),
      }),
    },
  };
}

function create(eventId) {
  const services = createServices();
  return Machine({ ...createConfig(eventId) }, { ...services });
}

export default create;
