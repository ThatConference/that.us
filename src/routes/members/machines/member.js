import { getClient } from '@urql/svelte';
import { navigateTo } from 'yrv';
import { Machine, assign, spawn, send } from 'xstate';

import profileConfig from '../../../machines/profile';
import followMachine from './followers';
import activitiesMachine from './activities';

import memberQueryApi from '../../../dataSources/api.that.tech/members/queries';
import memberMutationApi from '../../../dataSources/api.that.tech/members/mutations';

function createServices(client) {
  const { queryMemberBySlug, queryFollowers } = memberQueryApi(client);
  const { toggleFollow } = memberMutationApi(client);

  return {
    guards: {
      profileFound: (_, { data }) => data !== null,
      profileNotFound: (_, { data }) => data === null,

      isAuthenticated: context => context.isAuthenticated,
      isUnAuthenticated: context => context.isAuthenticated,
    },

    services: {
      queryProfile: context => queryMemberBySlug(context.slug),
      queryMyFollowing: context => queryFollowers(context.slug),
      toggleFollow: context => toggleFollow(context.profile.profileSlug),
    },

    actions: {
      logError: (context, event) => console.error({ context, event }),
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
        followers: (_, { data }) => data.followers.profiles.map(f => f.id),
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
