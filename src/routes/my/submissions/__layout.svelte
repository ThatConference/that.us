<script>
	import { ActionHeader } from '$elements';

	import { Highlight as HighlightLink } from '$elements/links';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
</script>

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="My Submissions">
			<HighlightLink href="/activities/create/">Create Activity</HighlightLink>
		</ActionHeader>
	</div>

	<slot />

	<div slot="footer">
		<Sponsor />
	</div>
</StackedLayout>
