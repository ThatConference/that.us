import { error } from '@sveltejs/kit';
import speakerQueriesApi from '$dataSources/api.that.tech/speakers/queries';
import eventQueriesApi from '$dataSources/api.that.tech/events/queries';

export async function load({ url }) {
	const eventSlug = url.searchParams.has('eventSlug') ? url.searchParams.get('eventSlug') : null;

	if (eventSlug == null) throw error(404, 'Invalid Event');

	const { queryMyAcceptedSpeaker } = speakerQueriesApi();
	const { queryEventForAcceptedSpeaker } = eventQueriesApi();

	const [acceptedSpeaker, eventDetails] = await Promise.all([
		queryMyAcceptedSpeaker(eventSlug),
		queryEventForAcceptedSpeaker(eventSlug)
	]);

	if (!acceptedSpeaker) throw error(404, 'Counselor Not Found');

	return {
		acceptedSpeaker,
		eventDetails
	};
}
