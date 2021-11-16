<script context="module">
	import auth0 from '$utils/security';
	import speakerQueriesApi from '$dataSources/api.that.tech/speakers/queries';

	export const load = auth0.withPageAuthRequired({
		load: async function load({ fetch }) {
			const { querySpeakerAcceptDownValues } = speakerQueriesApi(fetch);
			const dropDownValues = await querySpeakerAcceptDownValues();

			return {
				props: {
					dropDownValues
				}
			};
		}
	});
</script>

<script>
	export let dropDownValues;

	import { setContext } from 'svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	setContext('SPEAKER_ACCEPT_ENUMS', dropDownValues);
</script>

<Layout>
	<main class="relative">
		<div class="mx-auto max-w-screen-xl px-4 mt-24">
			<slot />
		</div>
	</main>
</Layout>
