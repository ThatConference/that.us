import eventsApi from '$dataSources/api.that.tech/events/queries';

import { claimCodes } from '$utils/config.public.js';

export async function load({ fetch }) {
	const { queryActiveEventsForProducts } = eventsApi(fetch);
	let events = await queryActiveEventsForProducts();
	events = events.filter((e) => e.type !== 'DAILY');

	return {
		claimCodes,
		events
	};
}
