import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params }) {
	const { event, date } = params;
	const eventSlug = `${event}/${date}`;

	const { queryEventWithSpeakersBySlug } = eventsApi();

	return {
		eventSlug,
		event: await queryEventWithSpeakersBySlug(eventSlug)
	};
}
