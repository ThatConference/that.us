<script context="module">
	export async function load({ page, context }) {
		//todo: we need to get this from some config somewhere or better yet an api
		const upNextHybridEvent = `OlyDhUyrp2DI9babqZO9`;

		const eventId = page.query.has('event') ? page.query.get('event') : upNextHybridEvent;
		const selectedEvent = context.events.find((i) => i.id === eventId);

		const activeEvents = {
			daily: [],
			online: [],
			hybrid: [],
			backdoor: selectedEvent
		};

		return {
			props: {
				...context,
				activeEvents,
				eventId,
				isCallForSpeakersOpen: selectedEvent.isCallForSpeakersOpen
			}
		};
	}
</script>

<script>
	export let isCallForSpeakersOpen;
	export let events;
	export let activeEvents;
	export let eventId;

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { ModalError } from '$elements';
	import Create from './index.svelte';

	onMount(() => {
		if (!$page.query.has('event')) window.history.replaceState(null, null, `?event=${eventId}`);
	});
</script>

{#if isCallForSpeakersOpen}
	<Create {events} {activeEvents} isBackdoor={true} {eventId} />
{:else}
	<ModalError
		title="Call for speakers has ended"
		text={`I'm sorry ${activeEvents.backdoor.name} call for speakers has ended.`}
		action={{ title: 'All Events', href: '/events' }}
	/>
{/if}
