<script context="module">
	import auth0 from '$utils/security';
	import speakerQueriesApi from '$dataSources/api.that.tech/speakers/queries';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	export const load = auth0.withPageAuthRequired({
		load: async function load({ fetch, url }) {
			const eventSlug = url.searchParams.has('eventSlug')
				? url.searchParams.get('eventSlug')
				: null;

			if (eventSlug == null)
				return {
					status: 404,
					error: 'Invalid Event Parameters'
				};

			const { querySpeakerAcceptDownValues } = speakerQueriesApi(fetch);
			const { queryEventBySlug } = eventsApi(fetch);

			const [event, dropDownValues] = await Promise.all([
				queryEventBySlug(eventSlug),
				querySpeakerAcceptDownValues()
			]);

			return {
				props: {
					event,
					dropDownValues
				},
				stuff: {
					event,
					eventSlug
				}
			};
		}
	});
</script>

<script>
	export let dropDownValues;
	export let event;

	import { setContext } from 'svelte';

	import Layout from '$components/events/layouts/hybrid/Layout.svelte';

	setContext('SPEAKER_ACCEPT_ENUMS', dropDownValues);
</script>

<div class="bg-thatBlue-100 bg-opacity-25">
	<Layout {event}>
		<slot />
	</Layout>
</div>
