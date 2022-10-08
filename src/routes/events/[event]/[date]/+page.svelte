<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Hybrid from '../../_components/_Hybrid.svelte';
	import MultiDay from '../../_components/_MultiDay.svelte';
	import Online from '../../_components/_Online.svelte';

	let { event, eventSlug } = data;
	let eventFormat;

	const metaTags = ((title = `${event.name} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${event.description} at THAT`,
			openGraph: {
				type: 'website',
				url: `https://that.us/events/${eventSlug}`
			}
		})
	}))();

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
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<svelte:component this={eventFormat} {event} />
