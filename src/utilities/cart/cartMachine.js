import { createMachine, assign } from 'xstate';
import { isEmpty } from 'lodash';

import { log } from '../error';
import createConfig from './cartConfig';

const cartKeyName = 'cart';
const cartVersion = '1.0.0';

function createServices() {
  return {
    guards: {
      hasCartItems: context => !isEmpty(context.cart),
      isEmptyCart: context => isEmpty(context.cart),
    },

    services: {},

    actions: {
      logError: (context, event) =>
        log({
          error: 'cart state machine has ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'cart' },
        }),

      readLocalStorage: assign({
        cart: () => {
          const localCart = window.localStorage.getItem(cartKeyName);
          const results = JSON.parse(localCart) || undefined;

          return results && results.lineItems ? results.lineItems : {}; // maybe null would be better
        },
      }),

      setLocalStorage: context => {
        const { cart } = context;

        const localCart = {
          version: cartVersion,
          lineItems: cart,
        };

        window.localStorage.setItem(cartKeyName, JSON.stringify(localCart));
      },

      clearCart: assign({
        cart: () => ({}),
      }),

      clearLocalStorage: () => window.localStorage.removeItem(cartKeyName),

      addItem: assign({
        eventId: (_, event) => event.eventId,
        cart: (context, event) => {
          if (!event.id) {
            throw new Error('No id passed into addItem');
          }

          const {
            id,
            quantity = 1,
            price,
            name,
            description,
            isBulkPurchase,
          } = event;
          const currentCart = context.cart;

          if (currentCart[id]) {
            currentCart[id] = {
              qty: event.quantity
                ? event.quantity
                : currentCart[id].qty + quantity,
            };
          } else {
            currentCart[id] = {
              qty: quantity,
            };
          }

          currentCart[id] = {
            ...currentCart[id],
            id,
            name,
            description,
            price,
            isBulkPurchase,
          };

          return currentCart;
        },
      }),

      removeItem: assign({
        cart: (context, event) => {
          if (!event.id) {
            throw new Error('No id passed into removeItem');
          }

          const { id } = event;
          const currentCart = context.cart;

          delete currentCart[id];

          return currentCart;
        },
      }),
    },
  };
}

function create(meta) {
  const services = createServices();
  return createMachine({ ...createConfig(meta) }, { ...services });
}

export default create;
