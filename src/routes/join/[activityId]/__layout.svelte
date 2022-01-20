<script context="module">
	import auth0 from '$utils/security';

	export const load = auth0.withPageAuthRequired();
</script>

<svelte:head>
	<script src="https://meet.jit.si/external_api.js"></script>
</svelte:head>

<slot />
