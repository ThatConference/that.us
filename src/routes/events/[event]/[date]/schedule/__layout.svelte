<script context="module">
	import sessionsApi from '$dataSources/api.that.tech/sessions';

	export async function load({ stuff, fetch }) {
		const { querySessionsBySlug } = sessionsApi(fetch);

		const sessions = await querySessionsBySlug({ slug: stuff.eventSlug, pageSize: 250 });

		return {
			props: {
				...stuff,
				sessions
			},
			stuff: {
				...stuff,
				sessions
			}
		};
	}
</script>

<script>
	export let event;

	import Layout from '$components/events/layouts/hybrid/Layout.svelte';
</script>

<Layout {event}>
	<slot />
</Layout>
