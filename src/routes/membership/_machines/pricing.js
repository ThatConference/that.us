import { createMachine, assign } from 'xstate';

import productsQueryApi from '$dataSources/api.that.tech/products/queries';
import { log } from '$utils/error';

import createConfig from './pricingConfig';

function createServices() {
	const { queryProductsByEvent } = productsQueryApi();

	return {
		guards: {},
		services: {
			queryProducts: (context) => queryProductsByEvent(context.eventId)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'pricing parent state machine has ended in the error state.',
					extra: { context, event }
				}),

			queryProductsSuccess: assign({
				eventTicket: (_, { data }) => data.find((element) => element.productType === 'TICKET'),
				membership: (_, { data }) => data.find((element) => element.productType === 'MEMBERSHIP')
			})
		}
	};
}

function create(eventId) {
	const services = createServices();
	return createMachine({ ...createConfig(eventId) }, { ...services });
}

export default create;
