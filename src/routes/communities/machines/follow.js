import { Machine, assign } from 'xstate';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';

function createMachine(community, apiClient) {
  const { queryCommunityFollowers } = communityQueryApi(apiClient);
  // query next on page?

  return Machine(
    {
      id: 'followers',
      initial: 'init',
      context: {
        community,
        cursor: null,
        followers: [],
      },

      on: {
        NEXT: {
          target: 'loadingNext',
        },
      },

      states: {
        init: {
          invoke: {
            id: 'initialQueryFollowers',
            src: 'queryFollowers',
            onDone: {
              actions: ['queryFollowersSuccess'],
              target: 'loaded',
            },
            onError: 'loadingFailed',
          },
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

        loaded: {},

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
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),

        queryFollowersSuccess: assign({
          followers: (_, { data }) => data.followers.members,
          cursor: (_, { data }) => data.followers.cursor,
        }),

        queryNextSuccess: assign({ followers: (_, event) => event.data }),
      },
    },
  );
}

export default createMachine;
