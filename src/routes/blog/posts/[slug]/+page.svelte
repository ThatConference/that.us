<script>
	export let data;

	let { component, slug } = data;
</script>

<svelte:component this={component} {slug} />
