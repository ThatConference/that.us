<script>
	import SecureLoading from './_components/secureLoading.svelte';

	import { getAuth } from '$utils/security';
	import { fade } from 'svelte/transition';

	const { token } = getAuth();

	let loaded = $token;
	function handleLoaded(e) {
		loaded = true;
	}
</script>

{#if !loaded}
	<div transition:fade>
		<SecureLoading on:LOADED={handleLoaded} />
	</div>
{:else}
	<slot />
{/if}
