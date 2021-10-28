<script context="module">
	export async function load({ stuff }) {
		return {
			props: {
				component: stuff.component,
				slug: stuff.slug
			}
		};
	}
</script>

<script>
	export let component;
	export let slug;
</script>

<svelte:component this={component} {slug} />
