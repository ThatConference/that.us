import { getClient } from '@urql/svelte';
import { navigateTo } from 'yrv';
import { Machine, assign, spawn, send } from 'xstate';

import { isValidSlug } from '../../../machines/guards/slug';
import { log } from '../../../utilities/error';
import partnerQueryApi from '../../../dataSources/api.that.tech/partner/queries';
import partnerMutationsApi from '../../../dataSources/api.that.tech/partner/mutations';
import meQueryApi from '../../../dataSources/api.that.tech/me/queries';

import createPartnerConfig from './partnerConfig';
import createFollowMachine from './followers';

function createServices(client) {
  const { getPartner } = partnerQueryApi(client);
  const { toggleFollow } = partnerMutationsApi(client);
  const { queryMeFollowingPartners } = meQueryApi(client);

  return {
    guards: {
      isValidSlug,
      profileFound: (_, { data }) => data !== null,
      profileNotFound: (_, { data }) => data === null,

      isAuthenticated: context => context.isAuthenticated,
      isUnAuthenticated: context => context.isAuthenticated,
    },

    services: {
      queryProfile: context => getPartner(context.slug),
      queryMyFollowing: () => queryMeFollowingPartners(),
      toggleFollow: context => toggleFollow(context.profile.id),
    },

    actions: {
      logError: (context, event) =>
        log({
          error: 'partners partner state machine ended in the error state.',
          extra: { context, event },
          tags: { stateMachine: 'partners' },
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
