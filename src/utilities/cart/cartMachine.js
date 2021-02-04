import { createMachine, assign } from 'xstate';
import { isEmpty } from 'lodash';

import { log } from '../error';
import createConfig from './cartConfig';

const cartKeyName = 'cart';

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
          return JSON.parse(localCart) || {}; // maybe null would be better
        },
      }),

      setLocalStorage: context => {
        window.localStorage.setItem(cartKeyName, JSON.stringify(context.cart));
      },

      clearCart: assign({
        cart: () => ({}),
      }),

      clearLocalStorage: () => window.localStorage.removeItem(cartKeyName),

      addItem: assign({
        cart: (context, event) => {
          if (!event.id) {
            throw new Error('No id passed into addItem');
          }

          const { id, quantity = 1, price, name, description } = event;
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
