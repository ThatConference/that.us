import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params, url }) {
	const { year } = params;

	let eventSlug;
	let eventName;

	if (url.pathname.startsWith(`/events/tx/`)) {
		eventName = 'tx';
		eventSlug = `tx/${year}`;
	} else if (url.pathname.startsWith(`/events/wi/`)) {
		eventName = 'wi';
		eventSlug = `wi/${year}`;
	}

	const { queryEventWithSpeakersBySlug } = eventsApi();
	const event = await queryEventWithSpeakersBySlug(eventSlug);

	return {
		eventName,
		event
	};
}
