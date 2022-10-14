import communityQueryApi from '$dataSources/api.that.tech/community/queries';

export async function load({ fetch }) {
	const { queryActiveThatEvents } = communityQueryApi(fetch);
	const events = await queryActiveThatEvents();

	const filtered = events.filter((x) => x.type === 'HYBRID_MULTI_DAY');

	return {
		events: filtered
	};
}
