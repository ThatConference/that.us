import eventsApi from '$dataSources/api.that.tech/events/queries';
import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

export async function load({ params, fetch }) {
	const { event, date } = params;
	const eventSlug = `${event}/${date}`;

	const { querySessionDropDownValues } = sessionsQueryApi(fetch);
	const queryEvent = () => eventsApi(fetch).queryEventBySlug(eventSlug);

	const eventDetails = await queryEvent();

	return {
		event: eventDetails,
		sessionEnumLookups: await querySessionDropDownValues(),
		eventSlug
	};
}
