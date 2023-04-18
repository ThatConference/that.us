<script>
	import { ActionHeader } from '$elements';

	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
</script>

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Notification Preferences" />
	</div>

	<slot />
</StackedLayout>
