<script context="module">
	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

	export async function load({ params, fetch }) {
		const { event, date } = params;
		const eventSlug = `${event}/${date}`;

		const { querySessionDropDownValues } = sessionsQueryApi(fetch);
		const queryEvent = () => eventsApi(fetch).queryEventBySlug(eventSlug);

		const eventDetails = await queryEvent();

		return {
			props: {
				event: eventDetails,
				sessionEnumLookups: await querySessionDropDownValues()
			},
			stuff: {
				event: eventDetails,
				eventSlug
			}
		};
	}
</script>

<script>
	export let sessionEnumLookups;

	import { setContext } from 'svelte';

	setContext('SESSION_ENUMS', sessionEnumLookups);
</script>

<slot />
