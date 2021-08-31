<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import currentEvent from '$stores/currentEvent';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	import Hybrid from '../_components/_Hybrid.svelte';
	import MultiDay from '../_components/_MultiDay.svelte';
	import Online from '../_components/_Online.svelte';

	const { event, date } = $page.params;
	const eventSlug = `${event}/${date}`;

	const metaTags = seoMetaTags({
		title: 'Event - THAT',
		description: 'Upcoming and Past Events at THAT',
		openGraph: {
			type: 'website',
			url: `https://that.us/events/${eventSlug}`
		}
	});

	let eventFormat;

	function queryEvent() {
		return eventsApi()
			.queryEventBySlug(eventSlug)
			.then((event) => {
				currentEvent.set({ eventId: event.id, title: event.name });

				switch (event.type) {
					case 'HYBRID_MULTI_DAY':
						eventFormat = Hybrid;
						break;

					case 'MULTI_DAY':
						eventFormat = MultiDay;
						break;

					default:
						eventFormat = Online;
						break;
				}

				return event;
			});
	}
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

{#await queryEvent() then event}
	<svelte:component this={eventFormat} {event} />
{/await}
