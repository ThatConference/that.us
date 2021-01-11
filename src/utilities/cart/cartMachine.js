import { Machine, assign } from 'xstate';
import { isEmpty } from 'lodash';

import { log } from '../error';
import createConfig from './cartConfig';

const cartKeyName = 'cart';

function createServices() {
  return {
    guards: {
      hasCartItems: context => !isEmpty(context.cart),
      isEmptyCart: context => isEmpty(context.cart),

      isAuthenticated: context => context.isAuthenticated,
      hasUserProfile: context => context.hasUserProfile,
    },

    services: {},

    actions: {
      logError: (context, event) =>
        log({
          error: 'cart state machine has ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'cart' },
        }),

      setIsAuthenticated: assign({
        isAuthenticated: (_, event) => event.isAuthenticated,
      }),

      setHasUserProfile: assign({
        hasUserProfile: (_, event) => event.hasUserProfile,
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
          if (!event.productId) {
            throw new Error('No productId passed into addItem');
          }

          const { productId, quantity = 1 } = event;
          const currentCart = context.cart;

          if (currentCart[productId]) {
            currentCart[productId] = {
              id: productId,
              qty: event.quantity
                ? quantity
                : currentCart[productId].qty + quantity,
            };
          } else {
            currentCart[productId] = {
              id: productId,
              qty: quantity,
            };
          }

          return currentCart;
        },
      }),

      removeItem: assign({
        cart: (context, event) => {
          if (!event.productId) {
            throw new Error('No productId passed into removeItem');
          }

          const { productId } = event;
          const currentCart = context.cart;

          delete currentCart[productId];

          return currentCart;
        },
      }),
    },
  };
}

function create(meta) {
  const services = createServices();
  return Machine({ ...createConfig(meta) }, { ...services });
}

export default create;
