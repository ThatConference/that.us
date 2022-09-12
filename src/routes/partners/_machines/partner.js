import { goto } from '$app/navigation';
import { createMachine, assign } from 'xstate';

import { isValidSlug } from '$machines/guards/slug';
import { log } from '$utils/error';
import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';
import partnerMutationsApi from '$dataSources/api.that.tech/partner/mutations';
import partnerLeadsMutationsApi from '$dataSources/api.that.tech/partner/leads/mutations';
import meQueryApi from '$dataSources/api.that.tech/me/queries';

import createPartnerConfig from './partnerConfig';

function createServices() {
	const { getPartner, queryFollowers } = partnerQueryApi();
	const { toggleFollow } = partnerMutationsApi();
	const { queryMeFollowingPartners } = meQueryApi();
	const { addLead } = partnerLeadsMutationsApi();

	return {
		guards: {
			isValidSlug,
			profileFound: (_, { data }) => data !== null,
			profileNotFound: (_, { data }) => data === null,
			isAuthenticated: (context) => context.isAuthenticated,
			isUnAuthenticated: (context) => context.isAuthenticated
		},

		services: {
			queryProfile: (context) => getPartner(context.slug),
			queryMyFollowing: () => queryMeFollowingPartners(),
			queryFollowers: (context) => queryFollowers(context.profile.id),
			toggleFollow: (context) => toggleFollow(context.profile.id),
			addLeadMutate: (context) => addLead(context.profile.id)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'partners partner state machine ended in the error state.',
					extra: { context, event }
				}),

			notFound: () => goto('/not-found/'),

			setIsAuthenticated: assign({
				isAuthenticated: (_, event) => event.status
			}),

			queryProfileSuccess: assign({
				profile: (_, { data }) => data
			}),

			queryMyFollowingSuccess: assign({
				isFollowing: (context, { data }) => data.includes(context.profile.id)
			}),

			queryFollowersSuccess: assign({
				followers: (_, { data: { followers } }) => followers.members
			}),

			toggleFollowSuccess: assign({
				isFollowing: (_, event) => event.data
			}),

			addLeadSuccess: assign({
				leadAdded: (_, event) => event.result
			})
		}
	};
}

function create(slug) {
	const services = createServices();
	return createMachine({ ...createPartnerConfig(slug) }, { ...services });
}

export default create;
