// file needs to be +layout.server.js to ensure security fires in hooks.server.js handle
import dayjs from 'dayjs';
import eventsApi from '$dataSources/api.that.tech/events/queries';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import lodash from 'lodash';

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
						dayjs().isBetween(dayjs(i.callForSpeakersOpenDate), dayjs(i.callForSpeakersCloseDate)),
					'endDate'
				)
		);
	}
	return activeEvents;
}

export async function load({ url, fetch }) {
	const { queryEventsByCommunity } = eventsApi(fetch);

	const isBackdoor =
		url.pathname === '/activities/create/backdoor/' ||
		url.pathname === '/activities/create/backdoor';

	const eventId = url.searchParams.get('event') || config.eventId;
	const events = await queryEventsByCommunity();

	return {
		events,
		activeEvents: transformEvents(events, eventId, isBackdoor),
		isBackdoor,
		eventId
	};
}
