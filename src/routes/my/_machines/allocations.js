import { createMachine, assign } from 'xstate';

import { log } from '$utils/error';

import apiConfig from '$machines/api';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

function createServices() {
	const { queryMyTicketAllocations } = ordersApi();

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

function create(meta) {
	const services = createServices();
	return createMachine({ ...apiConfig(meta) }, { ...services });
}

export default create;
