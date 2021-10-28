<script context="module">
	export async function load({ stuff }) {
		return {
			props: {
				component: stuff.component
			}
		};
	}
</script>

<script>
	export let component;
</script>

<svelte:component this={component} />
