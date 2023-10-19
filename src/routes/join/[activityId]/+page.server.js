// file needs to be page.server.js to ensure security fires in hooks.server.js handle
import { redirect } from '@sveltejs/kit';
import sessionsApi from '$dataSources/api.that.tech/sessions';
import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params, fetch }) {
	const { activityId } = params;

	const { querySessionById } = sessionsApi(fetch);
	const { canAccessEvent } = eventsApi(fetch);

	const activityDetails = await querySessionById(activityId);

	if (activityDetails) {
		let hasAccess = await canAccessEvent(activityDetails.eventId);
		if (!hasAccess) {
			throw redirect(302, `/join/access-denied/?id=${activityId}`);
		}
	}
	throw redirect(302, `https://meet.jit.si/that-${activityId}`);
}
