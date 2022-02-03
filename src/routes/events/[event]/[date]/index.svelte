<script context="module">
	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import Hybrid from '../../_components/_Hybrid.svelte';
	import MultiDay from '../../_components/_MultiDay.svelte';
	import Online from '../../_components/_Online.svelte';

	let eventFormat;

	export async function load({ params, fetch }) {
		const { event, date } = params;
		const eventSlug = `${event}/${date}`;

		const { queryEventWithSpeakersBySlug } = eventsApi(fetch);

		function query(slug) {
			return queryEventWithSpeakersBySlug(slug).then((event) => {
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

		return {
			props: {
				eventSlug,
				event: await query(eventSlug)
			}
		};
	}
</script>

<script>
	export let event;
	export let eventSlug;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

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
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<svelte:component this={eventFormat} {event} />
