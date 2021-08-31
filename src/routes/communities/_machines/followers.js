import { createMachine, assign } from 'xstate';

import gFetch from '$utils/gFetch';
import { log } from '$utils/error';
import createPagingConfig from '$machines/paging';
import communityQueryApi from '$dataSources/api.that.tech/community/queries';

function createServices(client) {
	const { queryCommunityFollowers } = communityQueryApi(client);

	return {
		guards: {
			hasMore: (_, event) => event.data !== null
		},

		services: {
			load: (context) => queryCommunityFollowers(context.meta.id),
			loadNext: (context) => queryCommunityFollowers(context.meta.id)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'communities followers state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'followers' }
				}),

			loadSuccess: assign({
				items: (_, { data: { followers } }) => followers.members,
				cursor: (_, { data: { followers } }) => followers.cursor
			}),

			loadNextSuccess: assign({ items: (_, event) => event.data }),

			loadedAllSuccess: assign({
				items: () => [],
				cursor: () => undefined
			})
		}
	};
}

function create(meta, client = gFetch()) {
	const services = createServices(client);
	return createMachine({ ...createPagingConfig(meta) }, { ...services });
}

export default create;
