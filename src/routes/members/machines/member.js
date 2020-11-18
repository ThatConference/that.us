import { getClient } from '@urql/svelte';
import { navigateTo } from 'yrv';
import { Machine, assign, spawn, send } from 'xstate';

import { isValidSlug } from '../../../machines/guards/slug';
import profileConfig from '../../../machines/profile';
import followMachine from './followers';
import activitiesMachine from './activities';

import { log } from '../../../utilities/error';
import memberQueryApi from '../../../dataSources/api.that.tech/members/queries';
import memberMutationApi from '../../../dataSources/api.that.tech/members/mutations';
import meQueryApi from '../../../dataSources/api.that.tech/me/queries';

function createServices(client) {
  const { queryMemberBySlug } = memberQueryApi(client);
  const { toggleFollow } = memberMutationApi(client);
  const { queryMeFollowingMembers } = meQueryApi(client);

  return {
    guards: {
      isValidSlug,
      profileFound: (_, { data }) => data !== null,
      profileNotFound: (_, { data }) => data === null,

      isAuthenticated: context => context.isAuthenticated,
      isUnAuthenticated: context => context.isAuthenticated,
    },

    services: {
      queryProfile: context => queryMemberBySlug(context.slug),
      queryMyFollowing: () => queryMeFollowingMembers(),
      toggleFollow: context => toggleFollow(context.profile.profileSlug),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'members member state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'members' },
        }),
      notFound: () => navigateTo('/not-found'),

      setIsAuthenticated: assign({
        isAuthenticated: (_, event) => event.status,
      }),

      refreshFollowers: send('REFRESH', {
        to: context => context.followMachineServices,
      }),

      queryProfileSuccess: assign({
        profile: (_, { data }) => data,
      }),

      queryMyFollowingSuccess: assign({
        isFollowing: (context, { data }) => data.includes(context.profile.id),
      }),

      toggleFollowSuccess: assign({
        isFollowing: (_, event) => event.data,
      }),

      createFollowMachineServices: assign({
        followMachineServices: context =>
          spawn(followMachine(context.profile, client)),
      }),

      createActivitiesMachineServices: assign({
        activitiesMachineServices: context =>
          spawn(activitiesMachine(context.profile, client)),
      }),
    },
  };
}

function create(slug, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...profileConfig(slug, client) }, { ...services });
}

export default create;
