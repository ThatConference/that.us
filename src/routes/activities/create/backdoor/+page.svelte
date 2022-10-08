<script>
	export let data;

	import Create from '../+page.svelte';

	let { events, activeEvents, isBackdoor, eventId } = data;
</script>

<Create {events} {activeEvents} {isBackdoor} {eventId} />
