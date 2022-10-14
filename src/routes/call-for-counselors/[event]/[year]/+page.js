import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params, fetch }) {
	const { event, year } = params;
	const slug = `${event}/${year}`;

	const { queryEventForCfp } = eventsApi(fetch);

	return {
		event: await queryEventForCfp(slug)
	};
}
