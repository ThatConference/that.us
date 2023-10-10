import { error } from '@sveltejs/kit';
import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params, fetch }) {
	const { event, date } = params;
	const eventSlug = `${event}/${date}`;

	const { queryEventWithSpeakersBySlug } = eventsApi(fetch);
	const fetchedEvent = await queryEventWithSpeakersBySlug(eventSlug);
	if (!fetchedEvent) {
		throw error(404, 'Event not found');
	}

	return {
		eventSlug,
		event: fetchedEvent
	};
}
