<script>
	export let data;

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import { ModalError } from '$elements';
	import Create from '../+page.svelte';

	let { isCallForSpeakersOpen, events, activeEvents, eventId } = data;

	onMount(() => {
		if (!$page.url.searchParams.has('event'))
			window.history.replaceState(null, null, `?event=${eventId}`);
	});

	const metaTags = ((title = `THAT Conference Texas and Wisconsin call for speakers.`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `Do you want to speak at THAT Conference either online or in person. Submit today.`,
			openGraph: {
				type: 'website',
				url: `https://that.us/activities/create/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if isCallForSpeakersOpen}
	<Create {events} {activeEvents} isBackdoor={true} {eventId} />
{:else}
	<ModalError
		title="Call for speakers has ended"
		text={`I'm sorry ${activeEvents.backdoor.name} call for speakers has ended.`}
		action={{ title: 'All Events', href: '/events' }} />
{/if}
