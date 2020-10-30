import { getClient } from '@urql/svelte';
import { navigateTo } from 'yrv';
import { Machine, assign, spawn, send } from 'xstate';

import partnerQueryApi from '../../../dataSources/api.that.tech/partner/queries';
import createPartnerConfig from './partnerConfig';

function createServices(client) {
  const { getPartner } = partnerQueryApi(client);

  return {
    guards: {
      profileFound: (_, { data }) => data !== null,
      profileNotFound: (_, { data }) => data === null,

      isAuthenticated: context => context.isAuthenticated,
      isUnAuthenticated: context => context.isAuthenticated,
    },

    services: {
      queryProfile: context => getPartner(context.slug),
    },

    actions: {
      logError: (context, event) => console.error({ context, event }),
      notFound: () => navigateTo('/not-found'),

      setIsAuthenticated: assign({
        isAuthenticated: (_, event) => event.status,
      }),

      queryProfileSuccess: assign({
        profile: (_, { data }) => data,
      }),

      queryMyFollowingSuccess: assign({
        isFollowing: (context, event) =>
          event.data.includes(context.community.id),
      }),

      toggleFollowSuccess: assign({
        isFollowing: (_, event) => event.data,
      }),

      // createFollowMachineServices: assign({
      //   followMachineServices: context =>
      //     spawn(createFollowMachine(context.community, client)),
      // }),
    },
  };
}

function create(slug, client = getClient()) {
  const services = createServices(client);
  return Machine({ ...createPartnerConfig(slug, client) }, { ...services });
}

export default create;
