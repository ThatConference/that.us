import { Machine, assign, spawn } from 'xstate';
import { navigateTo } from 'yrv';

import createFollowMachine from './follow';
import createActivitiesMachineServices from './activities';

import communityQueryApi from '../../../dataSources/api.that.tech/community/queries';
import communityMutationApi from '../../../dataSources/api.that.tech/community/mutations';

// const followEvent = {
//   type: 'FOLLOW', // event type
//   id: "12345", // communityid to follow
// };

function createMachine(slug, graphClient) {
  const { toggleFollow } = communityMutationApi(graphClient);
  const { queryCommunityBySlug } = communityQueryApi(graphClient);

  return Machine(
    {
      id: 'community',
      initial: 'loadingCommunity',

      context: {
        slug,
        community: undefined,
        followMachineServices: undefined,
        activitiesMachineServices: undefined,
        isFollowing: false,
      },

      on: {
        LOGOUT: {
          actions: [''],
          target: '.',
        },

        AUTHENTICATED: {
          actions: [''],
          target: '.',
        },
      },

      states: {
        loadingCommunity: {
          invoke: {
            id: 'queryCommunity',
            src: 'queryCommunity',
            onDone: [
              {
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

        toggleFollow: {
          invoke: {
            id: 'toggleFollow',
            src: 'toggleFollow',
            onDone: [
              {
                actions: 'toggleFollowSuccess',
                target: 'loaded',
              },
            ],
            onError: 'toggleFailed',
          },
        },

        loaded: {
          on: {
            FOLLOW: 'toggleFollow',
          },
        },

        notFound: {
          entry: 'notFound',
          type: 'final',
        },

        toggleFailed: {
          entry: 'logError',
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
      },

      services: {
        queryCommunity: context => queryCommunityBySlug(context.slug),
        toggleFollow: context => toggleFollow(context.community.id),
      },

      actions: {
        logError: (context, event) => console.error({ context, event }),
        notFound: () => navigateTo('/not-found'),

        queryCommunitySuccess: assign({
          community: (_, event) => event.data,
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

        onFollow: () => {
          console.log('onFollowEvent');
        },
      },
    },
  );
}

export default createMachine;
