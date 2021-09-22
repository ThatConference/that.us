<script context="module">
	import dayjs from 'dayjs';
	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
	import isBetween from 'dayjs/plugin/isBetween.js';
	import lodash from 'lodash';

	import auth0 from '$utils/security';
	import config from '$utils/config';

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
		load: async function load({ page, fetch }) {
			const { queryEvents } = eventsApi(fetch);

			const isBackdoor =
				page.path === '/activities/create/backdoor/' || page.path === '/activities/create/backdoor';

			const eventId = page.query.has('event') ? page.query.get('event') : config.eventId;
			const events = await queryEvents().then((r) => r.filter((i) => i.community === 'that'));

			return {
				context: {
					events,
					activeEvents: transformEvents(events, eventId, isBackdoor),
					isBackdoor,
					eventId
				}
			};
		}
	});
</script>

<slot />
