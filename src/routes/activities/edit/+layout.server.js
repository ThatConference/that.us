// file needs to be +layout.server.js to ensure security fires in hooks.server.js handle
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import lodash from 'lodash';
import { error } from '@sveltejs/kit';

import eventsApi from '$dataSources/api.that.tech/events/queries';
import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const { sortBy } = lodash;

function transformEvents(allEvents, eventId, isBackdoor) {
	const activeEvents = {};

	if (isBackdoor) {
		activeEvents.daily = [];
		activeEvents.online = [];
		activeEvents.hybrid = [];

		activeEvents.backdoor = allEvents.find((i) => i.id === eventId);
	} else {
		activeEvents.daily = sortBy(
			allEvents.filter((i) => i.type === 'DAILY').filter((i) => i.isActive)
		)[0];

		activeEvents.online = sortBy(allEvents.filter((i) => i.type === 'ONLINE'));

		activeEvents.hybrid = sortBy(
			allEvents.filter((i) => i.type === 'MULTI_DAY' || i.type === 'HYBRID_MULTI_DAY')
		);
	}
	return activeEvents;
}

export async function load({ params, fetch }) {
	const { activityId } = params;

	const { queryEventsByCommunity } = eventsApi(fetch);
	const { queryMySessionById } = sessionsQueryApi(fetch);

	const [activityDetails, events] = await Promise.all([
		queryMySessionById(activityId),
		queryEventsByCommunity()
	]);

	if (!activityDetails) {
		throw new error(404, {
			message: 'Activity Not Found'
		});
	}

	return {
		activityDetails,
		events,
		activeEvents: transformEvents(events, activityDetails.eventId, true),
		isBackdoor: true,
		eventId: activityDetails.eventId
	};
}
