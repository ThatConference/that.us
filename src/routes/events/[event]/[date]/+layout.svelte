<script>
	export let data;

	import { setContext } from 'svelte';

	let { sessionEnumLookups } = data;
	setContext('SESSION_ENUMS', sessionEnumLookups);
</script>

<slot />
