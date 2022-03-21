<script lang="js" context="module">
	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import lodash from 'lodash';

	let layout;
	const { uniqBy, sortBy } = lodash;

	function sortSpeakers(event) {
		return sortBy(
			uniqBy(event.speakers, (i) => i.id),
			(i) => `${i.firstName} ${i.lastName}`
		);
	}

	export async function load({ params, fetch }) {
		const { event, date } = params;
		const eventSlug = `${event}/${date}`;

		const { queryEventWithSpeakersBySlug } = eventsApi(fetch);

		const thisEvent = await queryEventWithSpeakersBySlug(eventSlug);

		switch (thisEvent.type) {
			case 'HYBRID_MULTI_DAY':
				layout = HybridLayout;
				break;
			default:
				layout = OnlineLayout;
				break;
		}

		return {
			props: {
				eventSlug,
				event: thisEvent,
				speakers: sortSpeakers(thisEvent)
			}
		};
	}
</script>

<script lang="js">
	import HybridLayout from '$components/events/layouts/hybrid/Layout.svelte';
	import OnlineLayout from '$elements/layouts/LandingLayout.svelte';
	import { fade } from 'svelte/transition';
	import Speakers from '../../_components/speakers/_Speakers.svelte';

	export let event;
	export let speakers;
</script>

<div class="bg-thatBlue-100 bg-opacity-25">
	<svelte:component this={layout} {event}>
		<section class="mt-40">
			<Speakers title="Speakers" {speakers} />
		</section>
	</svelte:component>
</div>
