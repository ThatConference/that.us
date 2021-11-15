import { createMachine, assign } from 'xstate';
import lodash from 'lodash';

import { log } from '$utils/error';
import createPagingConfig from '$machines/page';
import communitiesApi from '$dataSources/api.that.tech/community/queries';

const { uniqBy } = lodash;
function createServices() {
	const { queryNextAllCommunities } = communitiesApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) => queryNextAllCommunities(context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'communities communities state machine ended in the error state.',
					extra: { context, event }
				}),

			loadNextSuccess: assign({
				items: (context, event) =>
					uniqBy([...context.items, ...event.data.communities], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			})
		}
	};
}

function create({ items = [], cursor = undefined }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor }) }, { ...services });
}

export default create;
