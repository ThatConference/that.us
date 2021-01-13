/*
  AUTHENTICATED Event 
  send('AUTHENTICATED', {status: true})
  
  PROFILE_COMPLETED Event 
  send('PROFILE_COMPLETED', {status: true})
*/

function createConfig(metaContext) {
  return {
    id: 'orderSummaryMachine',
    initial: 'pendingLogin',
    context: {
      meta: metaContext || undefined,
      isAuthenticated: false,
      hasUserProfile: false,
    },

    on: {
      AUTHENTICATED: {
        actions: ['setIsAuthenticated'],
        target: 'pendingLogin',
      },

      PROFILE_COMPLETED: {
        actions: ['setHasUserProfile'],
      },
    },

    states: {
      pendingLogin: {
        on: {
          '': {
            cond: 'isAuthenticated',
            target: 'authenticated',
            meta: {
              completed: true,
            },
          },
        },
      },

      authenticated: {
        initial: 'pendingProfile',
        states: {
          pendingProfile: {
            on: {
              '': {
                cond: 'hasUserProfile',
                target: 'profileCompleted',
              },
            },
          },

          profileCompleted: {
            initial: 'pendingVerification',

            states: {
              pendingVerification: {
                on: {
                  complete: {
                    target: 'completePurchase',
                  },
                },
              },

              completePurchase: {
                type: 'final',
              },
            },
          },
        },
      },

      unAuthenticated: {},

      error: {
        entry: 'logError',
        type: 'final',
      },
    },
  };
}

export default createConfig;
