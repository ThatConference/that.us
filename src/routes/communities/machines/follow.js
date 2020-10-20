import { Machine, assign } from 'xstate';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';
import meQueryApi from '../../../dataSources/api.that.tech/me/queries';

function createMachine(community, apiClient) {
  const { queryMeCommunityFollows } = meQueryApi(apiClient);
  const { queryCommunityFollowers } = communityQueryApi(apiClient); // query next on page?

  return Machine(
    {
      id: 'followers',
      initial: 'init',

      context: {
        community,
        cursor: null,
        followers: [],
        followingIds: [],
      },

      states: {
        init: {
          type: 'parallel',
          states: {
            loadingFollowing: {
              initial: 'loading',
              states: {
                loading: {
                  invoke: {
                    id: 'initialQueryFollowers',
                    src: 'queryFollowers',
                    onDone: {
                      actions: ['queryFollowersSuccess'],
                      target: 'success',
                    },
                    onError: 'failed',
                  },
                },
                success: { type: 'final' },
                failed: { type: 'final' },
              },
            },

            loadingMeFollowing: {
              initial: 'loading',
              states: {
                loading: {
                  invoke: {
                    id: 'initialQueryMeFollowing',
                    src: 'queryMeFollowing',
                    onDone: {
                      actions: ['queryMeFollowingSuccess'],
                      target: 'success',
                    },
                    onError: 'failed',
                  },
                },
                success: { type: 'final' },
                failed: { type: 'final' },
              },
            },
          },
          onDone: 'loaded',
        },

        loadingNext: {
          invoke: {
            id: 'nextQueryFollowers',
            src: 'queryNextFollowers',
            onDone: {
              actions: ['queryNextSuccess'],
              target: 'loaded',
            },
            onError: 'loadingFailed',
          },
        },

        loaded: {
          on: {
            NEXT: {
              target: 'loadingNext',
            },
          },
        },

        loadingFailed: {
          entry: 'logError',
          type: 'final',
        },
      },
    },
    {
      guards: {},

      services: {
        queryFollowers: context =>
          queryCommunityFollowers(context.community.id),

        queryNextFollowers: context =>
          queryCommunityFollowers(context.community.id),

        queryMeFollowing: () => queryMeCommunityFollows(),
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),

        queryFollowersSuccess: assign({
          followers: (_, { data }) => data.followers.members,
          cursor: (_, { data }) => data.followers.cursor,
        }),

        queryNextSuccess: assign({ followers: (_, event) => event.data }),

        queryMeFollowingSuccess: assign({
          followingIds: (_, event) => event.data,
        }),
      },
    },
  );
}

export default createMachine;
