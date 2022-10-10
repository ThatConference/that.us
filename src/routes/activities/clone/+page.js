import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import lodash from 'lodash';

import eventsApi from '$dataSources/api.that.tech/events/queries';
import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';
import auth0 from '$utils/security/client';
import config from '$utils/config.public';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

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

		activeEvents.online = sortBy(
			allEvents
				.filter((i) => i.type === 'ONLINE')
				.filter((i) => i.isActive)
				.filter((i) => dayjs().isSameOrBefore(i.endDate, 'day')),
			'endDate'
		);

		activeEvents.hybrid = sortBy(
			allEvents
				.filter((i) => i.type === 'MULTI_DAY' || i.type === 'HYBRID_MULTI_DAY')
				.filter((i) => i.isActive)
				.filter(
					(i) =>
						dayjs().isBetween(
							dayjs(i.callForSpeakersOpenDate),
							dayjs(i.callForSpeakersCloseDate)
						) || dayjs().isBetween(dayjs(i.startDate).subtract(2, 'week'), dayjs(i.endDate)),
					'endDate'
				)
		);
	}
	return activeEvents;
}

export const load = auth0.withPageAuthRequired({
	load: async function load({ url }) {
		const { queryEventsByCommunity } = eventsApi();
		const { queryMySessionById } = sessionsQueryApi();

		const activityId = url.searchParams.get('id') || null;
		if (!activityId) {
			return {
				status: 404,
				error: 'Activity not found'
			};
		}

		const [events, activity] = await Promise.all([
			queryEventsByCommunity(),
			queryMySessionById(activityId)
		]);

		if (!activity) {
			return {
				status: 404,
				error: 'Activity not found'
			};
		}

		const isBackdoor = false;
		const eventId = config.eventId;

		return {
			activity,
			events,
			eventId,
			activeEvents: transformEvents(events, eventId, isBackdoor),
			isBackdoor
		};
	}
});
