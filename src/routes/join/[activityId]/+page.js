import { redirect } from '@sveltejs/kit';
import sessionsApi from '$dataSources/api.that.tech/sessions';
import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ params }) {
	const { activityId } = params;

	const { querySessionById } = sessionsApi();
	const { canAccessEvent } = eventsApi();

	const activityDetails = await querySessionById(activityId);

	if (activityDetails) {
		let hasAccess = await canAccessEvent(activityDetails.eventId);
		if (!hasAccess) {
			throw redirect(302, `/join/access-denied/?id=${activityId}`);
		}
	}

	return {
		activityId,
		activityDetails
	};
}
