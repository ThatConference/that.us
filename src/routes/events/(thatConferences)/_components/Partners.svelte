<script>
	export let event;

	import SponsorSimple from '$components/SponsorSimple.svelte';
</script>

<div id="sponsors" class="mx-auto max-w-7xl pb-12">
	<SponsorSimple eventId={event.id} />
</div>
