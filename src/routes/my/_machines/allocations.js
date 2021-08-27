import { getClient } from '@urql/svelte';
import { Machine, assign } from 'xstate';

import { log } from '$utils/error';

import apiConfig from '$machines/api';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

function createServices(client) {
	const { queryMyTicketAllocations } = ordersApi(client);

	return {
		guards: {},

		services: {
			load: () => queryMyTicketAllocations()
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'Order Allocations state machine ended in the error state.',
					extra: { context, event },
					tags: { stateMachine: 'Order Allocations' }
				}),

			loadSuccess: assign({
				results: (context, { data }) => data
			})
		}
	};
}

function create(meta, client = getClient()) {
	const services = createServices(client);
	return Machine({ ...apiConfig(meta) }, { ...services });
}

export default create;
