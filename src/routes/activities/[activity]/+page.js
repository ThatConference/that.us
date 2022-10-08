import { error } from '@sveltejs/kit';
import sessionsApi from '$dataSources/api.that.tech/sessions';
import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

export async function load({ params, fetch }) {
	const { getById } = sessionsApi(fetch);
	const { querySessionDropDownValues } = sessionsQueryApi(fetch);

	let activityId = params.activity;

	//todo need to figure out how to handle no sessions.. do we return an error, or just pop a message box
	let [activity, sessionLookups] = await Promise.all([
		getById(activityId),
		querySessionDropDownValues()
	]);

	if (!activity) {
		throw error(404, 'Activity not found');
	}

	return {
		activity,
		sessionLookups
	};
}
