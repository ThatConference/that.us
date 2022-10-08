import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params, fetch }) {
	const { queryEventWithSpeakersBySlug } = eventsApi(fetch);

	const { event, date } = params;
	const eventSlug = `${event}/${date}`;

	return {
		eventSlug,
		event: await queryEventWithSpeakersBySlug(eventSlug)
	};
}
