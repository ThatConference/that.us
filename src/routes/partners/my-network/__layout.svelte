<script context="module">
	import auth0 from '$utils/security';

	export const load = auth0.withPageAuthRequired();
</script>

<slot />
