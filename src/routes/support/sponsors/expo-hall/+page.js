import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ fetch }) {
	const { queryActiveEventsForProducts } = eventsApi(fetch);
	let events = await queryActiveEventsForProducts();
	events = events.filter((e) => e.type !== 'DAILY');

	const claimCodes = [
		{
			72423: {
				eventSlug: 'wi/2023',
				eventTitle: 'THAT Conference Wisconsin'
			}
		},
		{
			13023: {
				eventSlug: 'tx/2023',
				eventTitle: 'THAT Conference Texas'
			}
		}
	];

	return {
		claimCodes,
		events
	};
}
