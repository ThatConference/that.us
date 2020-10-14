import { Machine, assign } from 'xstate';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';

function createMachine(community, apiClient) {
  const {
    queryCommunityActivities,
    queryNextCommunityActivities,
  } = communityQueryApi(apiClient);
  // query next on page?

  return Machine(
    {
      id: 'activities',
      initial: 'init',
      context: {
        community,
        cursor: null,
        activities: [],
      },

      states: {
        init: {
          invoke: {
            id: 'initialQueryActivities',
            src: 'queryActivities',
            onDone: {
              actions: ['queryActivitiesSuccess'],
              target: 'loaded',
            },
            onError: 'loadingFailed',
          },
        },

        loadingNext: {
          invoke: {
            id: 'nextQueryActivities',
            src: 'queryNextActivities',
            onDone: {
              actions: ['queryActivitiesSuccess'],
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
        queryActivities: context =>
          queryCommunityActivities({ id: context.community.id }),

        queryNextActivities: context =>
          queryNextCommunityActivities({
            id: context.community.id,
            cursor: context.cursor,
          }),
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),

        queryActivitiesSuccess: assign({
          activities: (_, { data }) => data.sessions,
          cursor: (_, { data }) => data.cursor,
        }),

        queryNextSuccess: assign({ followers: (_, event) => event.data }),
      },
    },
  );
}

export default createMachine;
