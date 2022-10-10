import communityQueryApi from '$dataSources/api.that.tech/community/queries';

export async function load() {
	const { queryActiveThatEvents } = communityQueryApi();
	const thatActiveEvents = await queryActiveThatEvents();

	const filteredEvents = thatActiveEvents.filter((x) => x.type === 'HYBRID_MULTI_DAY');

	return {
		thatActiveEvents: filteredEvents
	};
}
