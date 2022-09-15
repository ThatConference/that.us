<script context="module">
	import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

	export async function load({ fetch }) {
		const { querySessionDropDownValues } = sessionsQueryApi(fetch);

		return {
			props: {
				sessionEnumLookups: await querySessionDropDownValues()
			}
		};
	}
</script>

<script>
	export let sessionEnumLookups;

	import { setContext } from 'svelte';

	setContext('SESSION_ENUMS', sessionEnumLookups);
</script>

<slot />
