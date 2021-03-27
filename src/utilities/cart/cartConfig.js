function createConfig(metaContext) {
  return {
    id: 'Cart',
    type: 'parallel',
    context: {
      meta: metaContext || undefined,
      eventId: undefined,
      cart: {},
      checkoutSessionId: undefined,
    },
    states: {
      verification: {
        initial: 'unVerified',

        on: {
          VERIFICATION_SUCCESS: '.verified',
        },

        states: {
          unVerified: {},
          verified: {},
        },
      },

      cart: {
        initial: 'init',

        on: {
          ADD_ITEM: [
            {
              cond: 'canAddItem',
              actions: ['readLocalStorage', 'addItem', 'setLocalStorage'],
              target: '.pending',
            },
            {
              target: '.invalidCart',
            },
          ],
        },

        states: {
          init: {
            on: {
              '': {
                actions: ['readLocalStorage'],
                target: 'new',
              },
            },
          },

          new: {
            on: {
              '': {
                cond: 'hasCartItems',
                target: 'pending',
              },
            },
          },

          pending: {
            on: {
              '': {
                cond: 'isEmptyCart',
                target: 'new',
              },

              UPDATE_QUANTITY: {
                actions: ['readLocalStorage', 'addItem', 'setLocalStorage'],
                target: 'pending',
              },

              REMOVE_ITEM: {
                actions: ['readLocalStorage', 'removeItem', 'setLocalStorage'],
                target: 'pending',
              },

              CLEAR_CART: {
                actions: ['clearCart', 'clearLocalStorage'],
                target: 'new',
              },
            },
          },

          error: {
            entry: 'logError',
            type: 'final',
          },

          invalidCart: {},
        },
      },
    },
  };
}

export default createConfig;
