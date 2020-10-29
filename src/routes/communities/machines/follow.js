import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';

function createMachine(community, client = getClient()) {
  const { queryCommunityFollowers } = communityQueryApi(client); // query next on page?

  return Machine(
    {
      id: 'followers',
      initial: 'loadingFollowers',

      context: {
        community,
        cursor: null,
        followers: [],
      },

      states: {
        loadingFollowers: {
          meta: {
            message: 'loading followers',
          },
          invoke: {
            id: 'initialQueryFollowers',
            src: 'queryFollowers',
            onDone: {
              meta: {
                message: 'loading followers success',
              },
              actions: ['queryFollowersSuccess'],
              target: 'loaded',
            },
            onError: {
              meta: {
                message: 'loading followers failed',
              },
              target: 'loadingFailed',
            },
          },
        },

        loadingNext: {
          meta: {
            message: 'loading next followers',
          },
          invoke: {
            id: 'nextQueryFollowers',
            src: 'queryNextFollowers',
            onDone: {
              meta: {
                message: 'loading next followers success',
              },
              actions: ['queryNextSuccess'],
              target: 'loaded',
            },
            onError: {
              meta: {
                message: 'loading next followers failed',
              },
              target: 'loadingFailed',
            },
          },
        },

        loaded: {
          meta: {
            message: 'followers loaded.',
          },
          on: {
            REFRESH: {
              meta: {
                message: 'parent request to refresh followers.',
              },
              target: 'loadingFollowers',
            },

            NEXT: {
              meta: {
                message: 'user requested to load next set of followers.',
              },
              target: 'loadingNext',
            },
          },
        },

        loadingFailed: {
          meta: {
            message: 'loading failed.',
          },
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
