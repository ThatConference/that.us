import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';
import { uniqBy } from 'lodash';

import { log } from '$utils/error';
import pagingConfig from '$machines/paging';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

function createServices() {
	const { queryMyBulkAllocations, queryMyBulkAllocationsNext } = ordersApi(getClient());

	return {
		guards: {
			hasMore: (_, { data }) => data.count > 0
		},

		services: {
			load: () => queryMyBulkAllocations(),
			loadNext: (context) => queryMyBulkAllocationsNext(context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'bulk allocations state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'bulkAllocations' }
				}),

			loadSuccess: assign({
				items: (_, { data }) => data.orders,
				cursor: (_, { data }) => data.cursor,
				count: (_, { data }) => data.count
			}),

			loadNextSuccess: assign({
				items: (context, { data }) => uniqBy([...context.items, ...data.orders], (i) => i.id),
				// items: (context, { data }) => [...context.items, ...data.orders],
				cursor: (_, { data }) => data.cursor,
				count: (_, { data }) => data.count
			})
		}
	};
}

function create() {
	const services = createServices();
	return Machine({ ...pagingConfig() }, { ...services });
}

export default create;
