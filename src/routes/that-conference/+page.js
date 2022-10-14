import communityQueryApi from '$dataSources/api.that.tech/community/queries';

export async function load({ fetch }) {
	const { queryActiveThatEvents } = communityQueryApi(fetch);
	const thatActiveEvents = await queryActiveThatEvents();

	const filteredEvents = thatActiveEvents.filter((x) => x.type === 'HYBRID_MULTI_DAY');

	return {
		thatActiveEvents: filteredEvents
	};
}
