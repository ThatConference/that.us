import { createMachine, assign } from 'xstate';
import lodash from 'lodash';

import { log } from '$utils/error';
import createPagingConfig from '$machines/page';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

const { uniqBy } = lodash;
function createServices() {
	const { queryMyBulkAllocationsNext } = ordersApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) => queryMyBulkAllocationsNext(context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'bulk allocations state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'bulkAllocations' }
				}),

			loadNextSuccess: assign({
				items: (context, { data }) => uniqBy([...context.items, ...data.orders], (i) => i.id),
				// items: (context, { data }) => [...context.items, ...data.orders],
				cursor: (_, { data }) => data.cursor,
				count: (_, { data }) => data.count
			}),

			loadedAllSuccess: () => {} // stub action for now.
		}
	};
}

function create({ items = [], cursor = undefined }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor }) }, { ...services });
}

export default create;
