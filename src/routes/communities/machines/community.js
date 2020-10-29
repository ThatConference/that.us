import { getClient } from '@urql/svelte';
import { Machine, assign, spawn, send } from 'xstate';
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

function createMachine(slug) {
  const client = getClient();

  const { toggleFollow } = communityMutationApi(client);
  const { queryCommunityBySlug } = communityQueryApi(client);
  const { queryMeCommunityFollows } = meQueryApi(client);

  return Machine(
    {
      id: 'community',
      initial: 'loading',

      context: {
        slug,
        community: undefined,
        followMachineServices: undefined,
        activitiesMachineServices: undefined,

        isFollowing: false,
        isAuthenticated: false,
      },

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
                target: 'communityLoaded',
              },
              {
                cond: 'communityNotFound',
                target: 'notFound',
              },
            ],
            onError: 'error',
          },
        },

        communityLoaded: {
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
                        actions: ['toggleFollowSuccess', 'refreshFollowers'],
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
    {
      guards: {
        communityFound: (_, event) => event.data !== null,
        communityNotFound: (_, event) => event.data === null,
        isAuthenticated: context => context.isAuthenticated,
        isUnAuthenticated: context => context.isAuthenticated,
      },

      services: {
        queryCommunity: context => queryCommunityBySlug(context.slug),
        queryMyFollowing: () => queryMeCommunityFollows(),
        toggleFollow: context => toggleFollow(context.community.id),
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),
        notFound: () => navigateTo('/not-found'),
        login: () => navigateTo('/login'),

        refreshFollowers: send('REFRESH', {
          to: context => context.followMachineServices,
        }),

        setIsAuthenticated: assign({
          isAuthenticated: (_, event) => event.status,
        }),

        queryCommunitySuccess: assign({
          community: (_, event) => event.data,
        }),

        queryMyFollowingSuccess: assign({
          isFollowing: (context, event) =>
            event.data.includes(context.community.id),
        }),

        toggleFollowSuccess: assign({
          isFollowing: (_, event) => event.data,
        }),

        createFollowMachineServices: assign({
          followMachineServices: context =>
            spawn(createFollowMachine(context.community, client)),
        }),

        createActivityMachineServices: assign({
          activitiesMachineServices: context =>
            spawn(createActivitiesMachineServices(context.community, client)),
        }),
      },
    },
  );
}

export default createMachine;
