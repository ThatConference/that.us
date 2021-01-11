function createConfig(metaContext) {
  return {
    id: 'cart',
    initial: 'init',

    context: {
      meta: metaContext || undefined,
      cart: {},
      checkoutSessionId: undefined,
      isAuthenticated: false,
      hasUserProfile: false,
    },

    on: {
      AUTHENTICATED: {
        actions: ['setIsAuthenticated'],
      },

      USER_PROFILE: {
        actions: ['setHasUserProfile'],
      },

      ADD_ITEM: {
        actions: ['readLocalStorage', 'addItem', 'setLocalStorage'],
        target: 'pending',
      },
    },

    states: {
      init: {
        meta: {
          message: 'Loading cart data from localStorage.',
        },
        on: {
          '': {
            actions: ['readLocalStorage'],
            target: 'new',
          },
        },
      },

      new: {
        meta: {
          message: 'Cart is currently empty.',
        },
        on: {
          '': {
            cond: 'hasCartItems',
            target: 'pending',
          },
        },
      },

      pending: {
        meta: {
          message: 'Cart has items and is pending purchase.',
        },

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

          VERIFY: {
            actions: ['verify'],
            target: 'verifying',
          },
        },
      },

      verifying: {
        meta: {
          message: 'Verifying cart before purchase.',
        },
        actions: ['redirectToVerify'],
      },

      error: {
        entry: 'logError',
        type: 'final',
      },
    },
  };
}

export default createConfig;
