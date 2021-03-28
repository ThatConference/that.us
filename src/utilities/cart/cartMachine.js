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

      isDuplicateMembership: (context, event) => {
        // triggers just replacing the item in the cart.
        if (isEmpty(context.cart)) return false;
        if (event.productType !== 'MEMBERSHIP') return false;

        const result = event.productType === context.productType;
        return result;
      },

      isSameTicketType: (context, event) => {
        if (isEmpty(context.cart)) return false;

        return event.productType !== context.productType;
      },

      isSameEvent: (context, event) => {
        if (isEmpty(context.cart)) return false;

        return context.eventId !== event.eventId;
      },
    },

    services: {},

    actions: {
      logError: (context, event) =>
        log({
          error: 'cart state machine has ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'cart' },
        }),

      saveAddErrorEventData: assign({
        addErrorEventData: (_, event) => event,
      }),

      readLocalStorage: assign(() => {
        const localCart = window.localStorage.getItem(cartKeyName);
        const results = JSON.parse(localCart) || {};

        const {
          lineItems = {},
          eventId = undefined,
          productType = undefined,
        } = results;

        return {
          eventId,
          cart: lineItems,
          productType,
        };
      }),

      setLocalStorage: context => {
        const { cart, eventId, productType } = context;

        const localCart = {
          version: cartVersion,
          lineItems: cart,
          eventId,
          productType,
        };

        window.localStorage.setItem(cartKeyName, JSON.stringify(localCart));
      },

      clearCart: assign({
        cart: () => ({}),
        eventId: () => undefined,
        productType: () => undefined,
      }),

      clearLocalStorage: () => window.localStorage.removeItem(cartKeyName),

      addItem: assign({
        eventId: (_, event) => event.eventId,
        productType: (_, event) => event.productType,
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
