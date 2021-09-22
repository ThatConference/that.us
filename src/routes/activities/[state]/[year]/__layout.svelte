<script context="module">
	import sessionsApi from '$dataSources/api.that.tech/sessions';

	export async function load({ page, fetch }) {
		const { querySessionsBySlug } = sessionsApi(fetch);

		const { state, year } = page.params;
		const eventSlug = `${state}/${year}`;

		const event = await querySessionsBySlug({ slug: eventSlug });
		// todo.. What do we do in the scenario where the event isn't found?

		return {
			props: {
				event
			},
			context: {
				event
			}
		};
	}
</script>

<script>
	export let event;

	import dayjs from 'dayjs';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { ActionHeader } from '$elements';
	import { Highlight as HighlightLink } from '$elements/links';

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
