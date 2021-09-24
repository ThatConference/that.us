<script context="module">
	import dayjs from 'dayjs';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
	import isBetween from 'dayjs/plugin/isBetween.js';
	import lodash from 'lodash';

	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

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

			activeEvents.online = sortBy(allEvents.filter((i) => i.type === 'ONLINE'));

			activeEvents.hybrid = sortBy(
				allEvents.filter((i) => i.type === 'MULTI_DAY' || i.type === 'HYBRID_MULTI_DAY')
			);
		}
		return activeEvents;
	}

	export const load = auth0.withPageAuthRequired({
		load: async function load({ page, fetch }) {
			const { activityId } = page.params;

			const { queryEventsByCommunity } = eventsApi(fetch);
			const { queryMySessionById } = sessionsQueryApi(fetch);

			const [activityDetails, events] = await Promise.all([
				queryMySessionById(activityId),
				queryEventsByCommunity()
			]);

			return {
				context: {
					activityDetails,
					events,
					activeEvents: transformEvents(events, activityDetails.eventId, true),
					isBackdoor: true,
					eventId: activityDetails.eventId
				}
			};
		}
	});
</script>

<slot />
