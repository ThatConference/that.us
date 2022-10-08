<script>
	export let data;

	import Layout from '$components/events/layouts/hybrid/Layout.svelte';

	let { event } = data;
</script>

<Layout {event}>
	<slot />
</Layout>
