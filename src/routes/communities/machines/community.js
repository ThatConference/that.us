import { Machine, assign, spawn } from 'xstate';
import { navigateTo } from 'yrv';

import createFollowMachine from './follow';
import createActivitiesMachineServices from './activities';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';
import communityMutationApi from '../../../dataSources/api.that.tech/community/mutations';
import meQueryApi from '../../../dataSources/api.that.tech/me/queries';

/*

FOLLOW Event
send('FOLLOW', {id: 'communityId'})

FOLLOWING Event
send('FOLLOWING', {status: true})

AUTH Event
send('AUTHENTICATED', {status: true})

*/

function createMachine(slug, graphClient) {
  const { toggleFollow } = communityMutationApi(graphClient);
  const { queryCommunityBySlug } = communityQueryApi(graphClient);
  const { queryMeCommunityFollows } = meQueryApi();

  return Machine(
    {
      id: 'community',
      type: 'parallel',

      context: {
        slug,
        community: undefined,
        followMachineServices: undefined,
        activitiesMachineServices: undefined,

        isFollowing: false,
        isAuthenticated: false,
      },

      states: {
        init: {
          meta: {
            message: 'loading data',
          },

          initial: 'loading',

          states: {
            loading: {
              meta: {
                message: 'loading community data',
              },
              invoke: {
                id: 'queryCommunity',
                src: 'queryCommunity',
                onDone: [
                  {
                    meta: {
                      message: 'community api call a success.',
                    },
                    cond: 'communityFound',
                    actions: [
                      'queryCommunitySuccess',
                      'createFollowMachineServices',
                      'createActivityMachineServices',
                    ],
                    target: 'loaded',
                  },
                  {
                    cond: 'communityNotFound',
                    target: 'notFound',
                  },
                ],
                onError: 'error',
              },
            },

            loaded: {
              meta: {
                message: 'user data loaded, now idle.',
              },
            },

            notFound: {
              meta: {
                message: 'community not found.',
              },
              entry: 'notFound',
              type: 'final',
            },

            error: {
              entry: 'logError',
              type: 'final',
            },
          },
        },

        user: {
          meta: {
            message: 'data has been loaded',
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

              on: {
                FOLLOW: '.toggleFollow',
              },

              states: {
                toggleFollow: {
                  meta: {
                    message: 'user requested to follow community.',
                  },

                  invoke: {
                    id: 'toggleFollow',
                    src: 'toggleFollow',
                    onDone: [
                      {
                        meta: {
                          message: 'toggle follow api success.',
                        },
                        actions: ['toggleFollowSuccess'],
                        type: 'final',
                      },
                    ],
                    onError: {
                      meta: {
                        message: 'toggle follow api errored.',
                      },
                      actions: ['logError'],
                      type: 'final',
                    },
                  },
                },
              },
            },

            unAuthenticated: {
              meta: {
                message: 'user is currently NOT authenticated',
              },

              on: {
                LOGINANDFOLLOW: {
                  entry: 'login',
                  type: 'final',
                },
              },
            },
          },
        },
      },
    },
    {
      guards: {
        communityFound: (_, event) => event.data !== null,
        communityNotFound: (_, event) => event.data === null,
        isAuthenticated: context => context.isAuthenticated,
        isUnAuthenticated: context => context.isAuthenticated,
      },

      services: {
        queryCommunity: context => queryCommunityBySlug(context.slug),
        queryMyFollowing: context => queryMeCommunityFollows(),
        toggleFollow: context => toggleFollow(context.community.id),
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),
        notFound: () => navigateTo('/not-found'),
        login: () => navigateTo('/login'),

        setIsAuthenticated: assign({
          isAuthenticated: (_, event) => event.status,
        }),

        queryCommunitySuccess: assign({
          community: (_, event) => event.data,
        }),

        queryMyFollowingSuccess: assign({
          isFollowing: (_, event) => event.data,
        }),

        toggleFollowSuccess: assign({
          isFollowing: (_, event) => event.data,
        }),

        createFollowMachineServices: assign({
          followMachineServices: context =>
            spawn(createFollowMachine(context.community, graphClient)),
        }),

        createActivityMachineServices: assign({
          activitiesMachineServices: context =>
            spawn(
              createActivitiesMachineServices(context.community, graphClient),
            ),
        }),
      },
    },
  );
}

export default createMachine;
