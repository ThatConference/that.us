// file needs to be +layout.server.js to ensure security fires in hooks.server.js handle
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import eventsApi from '$dataSources/api.that.tech/events/queries';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import lodash from 'lodash';

import config from '$utils/config.public';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

const { sortBy } = lodash;

function transformEvents(allEvents) {
	const activeEvents = {};

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

	return activeEvents;
}

export async function load({ url, fetch }) {
	const { queryEventsByCommunity } = eventsApi(fetch);

	const isBackdoor = url.pathname.startsWith('/activities/create/backdoor/');
	const events = await queryEventsByCommunity();

	let eventId = url.searchParams.get('event') || config.eventId;

	if (isBackdoor) {
		if (!url.searchParams.has('event')) {
			throw error(404, 'Event Not Found');
		}

		let activeEvents = {
			daily: [],
			online: [],
			hybrid: [],
			backdoor: events.find((i) => i.id === eventId)
		};

		return {
			events,
			isBackdoor,
			eventId,
			activeEvents
		};
	}

	// get the full list of
	let activeEvents = transformEvents(events);

	//set the default
	if (url.searchParams.has('event')) {
		eventId = url.searchParams.get('event');
	} else if (activeEvents.hybrid.length > 0) {
		eventId = activeEvents.hybrid[0].id;
	}

	return {
		events,
		activeEvents,
		isBackdoor,
		eventId
	};
}
