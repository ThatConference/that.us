import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params, fetch }) {
	const { event, date } = params;
	const eventSlug = `${event}/${date}`;

	const { queryEventWithSpeakersBySlug } = eventsApi(fetch);

	return {
		eventSlug,
		event: await queryEventWithSpeakersBySlug(eventSlug)
	};
}
