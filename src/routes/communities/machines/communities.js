import { Machine, assign } from 'xstate';
import { navigateTo } from 'yrv';
import _ from 'lodash';

import communitiesApi from '../../../dataSources/api.that.tech/community/queries';

/*
  SELECTED Event Payload
  send('SELECTED', {slug: '/whatever'})
  
  LOADNEXT Event Payload
  send('LOADNEXT')
*/

function createMachine(graphClient) {
  const { queryNextAllCommunities, queryAllCommunities } = communitiesApi(
    graphClient,
  );

  return Machine(
    {
      id: 'communities',
      initial: 'loadingCommunities',

      context: {
        communities: [],
        cursor: undefined,
      },

      states: {
        loadingCommunities: {
          invoke: {
            id: 'queryCommunities',
            src: 'queryCommunities',
            onDone: {
              actions: ['queryCommunitiesSuccess'],
              target: 'loaded',
            },
            onError: 'error',
          },
        },

        loadingNextCommunities: {
          invoke: {
            id: 'queryNextCommunities',
            src: 'queryCommunities',
            onDone: {
              actions: ['queryCommunitiesSuccess'],
              target: 'loaded',
            },
            onError: 'error',
          },
        },

        loaded: {
          on: {
            SELECTED: 'selected',
            LOADNEXT: 'loadingNextCommunities',
          },
        },

        selected: {
          entry: 'redirect',
          type: 'final',
        },

        error: {
          entry: 'logError',
          type: 'final',
        },
      },
    },
    {
      services: {
        queryCommunities: () => queryAllCommunities(),
        queryNextCommunities: context =>
          queryNextAllCommunities(context.cursor),
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),
        redirect: (_, event) => navigateTo(`/communities/${event.slug}`),

        queryCommunitiesSuccess: assign({
          communities: (_, event) => event.data,
        }),

        queryNextCommunitiesSuccess: assign({
          cursor: (_, event) => event.data.cursor,
          communities: (context, event) =>
            _.uniqBy([...context.communities, ...event.data], i => i.id),
        }),
      },
    },
  );
}

export default createMachine;
