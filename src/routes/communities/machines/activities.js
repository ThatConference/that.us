import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';

function createMachine(community, client = getClient()) {
  const {
    queryCommunityActivities,
    queryNextCommunityActivities,
  } = communityQueryApi(client);
  // query next on page?

  return Machine(
    {
      id: 'activities',
      initial: 'init',
      context: {
        community,
        cursor: null,
        activities: [],
        hasActivities: false,
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
            NEXT: 'loadingNext',
            REFRESH: 'init',
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
          hasActivities: (_, { data }) => data.sessions.length > 0,
        }),

        queryNextSuccess: assign({ followers: (_, event) => event.data }),
      },
    },
  );
}

export default createMachine;
