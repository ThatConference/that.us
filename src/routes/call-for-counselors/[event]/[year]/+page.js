import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params }) {
	const { event, year } = params;
	const slug = `${event}/${year}`;

	const { queryEventForCfp } = eventsApi();

	return {
		event: await queryEventForCfp(slug)
	};
}
