<script context="module">
	export async function load({ stuff }) {
		return {
			props: {
				...stuff
			}
		};
	}
</script>

<script>
	export let events;
	export let activeEvents;
	export let isBackdoor;
	export let eventId;

	import Create from './index.svelte';
</script>

<Create {events} {activeEvents} {isBackdoor} {eventId} />
