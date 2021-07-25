/*
  FOLLOW Event
  send('FOLLOW', {id: 'communityId'})

  FOLLOWING Event
  send('FOLLOWING', {status: true})

  AUTH Event
  send('AUTHENTICATED', {status: true})
*/

function createConfig(slug) {
  return {
    id: 'profile',
    initial: 'validating',

    context: {
      slug: slug || undefined,
      profile: undefined,
      isAuthenticated: false,
      followMachineServices: undefined,
    },

    on: {
      AUTHENTICATED: {
        actions: ['setIsAuthenticated'],
      },
    },

    states: {
      validating: {
        on: {
          '': [
            {
              cond: 'isValidSlug',
              target: 'loading',
            },
            {
              target: 'notFound',
            },
          ],
        },
      },
      loading: {
        invoke: {
          id: 'queryProfile',
          src: 'queryProfile',
          onDone: [
            {
              cond: 'profileFound',
              actions: ['queryProfileSuccess', 'createFollowMachineServices'],
              target: 'profileLoaded',
            },
            {
              cond: 'profileNotFound',
              target: 'notFound',
            },
          ],
          onError: 'error',
        },
      },

      profileLoaded: {
        initial: 'unknown',

        on: {
          AUTHENTICATED: {
            actions: ['setIsAuthenticated'],
            target: '.unknown',
          },
        },

        states: {
          unknown: {
            on: {
              '': [
                {
                  cond: 'isAuthenticated',
                  target: 'authenticated',
                },
                {
                  cond: 'isUnAuthenticated',
                  target: 'unAuthenticated',
                },
              ],
            },
          },

          authenticated: {
            initial: 'loadFollowing',

            on: {
              FOLLOW: '.toggleFollow',
              XCHANGE_CONTACT: '.addContact',
            },

            states: {
              loadFollowing: {
                invoke: {
                  id: 'queryMyFollowing',
                  src: 'queryMyFollowing',
                  onDone: [
                    {
                      actions: ['queryMyFollowingSuccess'],
                      target: 'loaded',
                    },
                  ],

                  onError: {
                    target: 'error',
                  },
                },
              },

              toggleFollow: {
                invoke: {
                  id: 'toggleFollow',
                  src: 'toggleFollow',
                  onDone: [
                    {
                      actions: ['refreshFollowers'],
                      target: 'loadFollowing',
                    },
                  ],
                  onError: {
                    target: 'error',
                  },
                },
              },

              addContact: {
                invoke: {
                  id: 'addLeadMutate',
                  src: 'addLeadMutate',
                  onDone: [
                    {
                      actions: ['addLeadSuccess'],
                      target: 'loaded',
                    },
                  ],
                  onError: {
                    target: 'error',
                  },
                },
              },

              loaded: {},

              error: {
                entry: 'logError',
                type: 'final',
              },
            },
          },
          unAuthenticated: {},
        },
      },

      notFound: {
        entry: 'notFound',
        type: 'final',
      },

      error: {
        entry: 'logError',
        type: 'final',
      },
    },
  };
}

export default createConfig;
