<script>
	export let data;

	import dayjs from 'dayjs';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { ActionHeader } from '$elements';
	import { Highlight as HighlightLink } from '$elements/links';

	let { event } = data;
	let hasEnded = dayjs(event.endDate).isBefore(dayjs(), 'day');
</script>

<StackedLayout>
	<div slot="header">
		<Nav />

		<ActionHeader title={event.name}>
			{#if !hasEnded}
				<HighlightLink href={`/activities/create/?event=${event.id}`}>
					Create Activity
				</HighlightLink>
			{/if}
		</ActionHeader>
	</div>

	<slot />

	<div slot="footer">
		<Sponsor eventId={event.id} />
	</div>
</StackedLayout>
