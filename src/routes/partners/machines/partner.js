import { getClient } from '@urql/svelte';
import { navigateTo } from 'yrv';
import { Machine, assign, spawn, send } from 'xstate';

import partnerQueryApi from '../../../dataSources/api.that.tech/partner/queries';
import partnerMutationsApi from '../../../dataSources/api.that.tech/partner/mutations';
import createPartnerConfig from './partnerConfig';

import createFollowMachine from './followers';

function createServices(client) {
  const { getPartner, queryFollowers } = partnerQueryApi(client);
  const { toggleFollow } = partnerMutationsApi(client);

  return {
    guards: {
      profileFound: (_, { data }) => data !== null,
      profileNotFound: (_, { data }) => data === null,

      isAuthenticated: context => context.isAuthenticated,
      isUnAuthenticated: context => context.isAuthenticated,
    },

    services: {
      queryProfile: context => getPartner(context.slug),
      queryMyFollowing: context => queryFollowers(context.profile.id),
      toggleFollow: context => toggleFollow(context.profile.id),
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
        followers: (_, { data }) => data.followers.members.map(f => f.id),
      }),

      createFollowMachineServices: assign({
        followMachineServices: context =>
          spawn(createFollowMachine(context.profile, client)),
      }),
    },
  };
}

function create(slug, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...createPartnerConfig(slug, client) }, { ...services });
}

export default create;
