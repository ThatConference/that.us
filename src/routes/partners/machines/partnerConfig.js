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
        meta: {
          message: 'validating community slug',
        },
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
        meta: {
          message: 'loading profile data',
        },
        invoke: {
          id: 'queryProfile',
          src: 'queryProfile',
          onDone: [
            {
              meta: {
                message: 'profile api call a success.',
              },
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
        meta: {
          message: 'user data loaded, now idle.',
        },

        initial: 'unknown',

        on: {
          AUTHENTICATED: {
            actions: ['setIsAuthenticated'],
            target: '.unknown',
          },
        },

        states: {
          unknown: {
            meta: {
              message: 'user security status is unknown.',
            },
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
            meta: {
              message: 'user is currently authenticated',
            },

            initial: 'loadFollowing',

            on: {
              FOLLOW: '.toggleFollow',
            },

            states: {
              loadFollowing: {
                meta: {
                  message: 'loading what communities the user follows.',
                },

                invoke: {
                  id: 'queryMyFollowing',
                  src: 'queryMyFollowing',
                  onDone: [
                    {
                      meta: {
                        message: 'load following api success.',
                      },
                      actions: ['queryMyFollowingSuccess'],
                      target: 'loaded',
                    },
                  ],

                  onError: {
                    meta: {
                      message: 'toggle follow api errored.',
                    },
                    target: 'error',
                  },
                },
              },

              toggleFollow: {
                meta: {
                  message: 'user requested to follow this profile.',
                },

                invoke: {
                  id: 'toggleFollow',
                  src: 'toggleFollow',
                  onDone: [
                    {
                      meta: {
                        message: 'toggle follow api success.',
                      },
                      actions: ['refreshFollowers'],
                      target: 'loadFollowing',
                    },
                  ],
                  onError: {
                    meta: {
                      message: 'toggle follow api errored.',
                    },
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
          unAuthenticated: {
            meta: {
              message: 'user is currently NOT authenticated',
            },
          },
        },
      },

      notFound: {
        meta: {
          message: 'profile not found.',
        },
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
