<script context="module">
	import auth0 from '$utils/security';
	import lodash from 'lodash';

	import partnerNetworkApi from '$dataSources/api.that.tech/partner/leads/queries';
	const { sortBy } = lodash;

	export const load = auth0.withPageAuthRequired({
		load: async function load({ fetch }) {
			const { queryMyNetwork } = partnerNetworkApi(fetch);

			const contacts = await queryMyNetwork().then((r) => sortBy(r, 'createdAt').reverse());

			return {
				stuff: {
					contacts
				}
			};
		}
	});
</script>

<script>
	import ProfileLayout from '$elements/layouts/Profile.svelte';
</script>

<ProfileLayout>
	<slot />
</ProfileLayout>
