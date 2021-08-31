import { createMachine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import gFetch from '$utils/gFetch';
import { log } from '$utils/error';
import createPagingConfig from '$machines/paging';
import communitiesApi from '$dataSources/api.that.tech/community/queries';

function createServices() {
	const { queryNextAllCommunities, queryAllCommunities } = communitiesApi(gFetch());

	return {
		guards: {
			hasMore: (_, event) => event.data !== null
		},

		services: {
			load: () => queryAllCommunities(),
			loadNext: (context) => queryNextAllCommunities(context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'communities communities state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'communities' }
				}),

			// todo: will need to add the correct data structure once we have paged communities
			loadSuccess: assign({
				items: (_, { data }) => data,
				cursor: (_, { data }) => undefined
			}),

			loadNextSuccess: assign({
				items: (context, event) =>
					uniqBy([...context.items, ...event.data.communities], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			})
		}
	};
}

function create() {
	const services = createServices();
	return createMachine({ ...createPagingConfig() }, { ...services });
}

export default create;
