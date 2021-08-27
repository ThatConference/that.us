<script>
	import { getClient } from '@urql/svelte';
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import currentEvent from '$store/currentEvent';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	import Hybrid from './_components/_Hybrid.sveltee';
	import MultiDay from './_components/_MultiDay.sveltee';
	import Online from './_components/_Online.sveltee';

	const { id, name } = $page.params;
	const eventSlug = `${id}/${name}`;

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
		return eventsApi(getClient())
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
