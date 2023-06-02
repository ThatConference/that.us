import eventQueryApi from '$dataSources/api.that.tech/events/queries';

export async function load({ fetch }) {
	const { queryActiveEventsByCommunitiesForJobs } = eventQueryApi(fetch);

	return {
		events: await queryActiveEventsByCommunitiesForJobs()
	};
}
