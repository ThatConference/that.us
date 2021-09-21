<script context="module">
	import favoritesApi from '$dataSources/api.that.tech/favorites';
	import config from '$utils/config';

	export async function load({ fetch }) {
		const { get } = favoritesApi(fetch);

		const activities = await get(config.eventId);

		return {
			props: {
				activities
			}
		};
	}
</script>

<script>
	export let activities;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ModalWarning, ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import ActivityList from '$components/activities/List.svelte';

	const metaTags = ((title = 'My Favorites - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "You're list of favorited activities.",
			openGraph: {
				type: 'website',
				url: `https://that.us/my/favorites`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="My Favorites">
			<HighlightLink href="/activities/">Return to Activities</HighlightLink>
		</ActionHeader>
	</div>

	<div slot="body">
		{#if activities.length > 0}
			<ActivityList reverse={true} {activities} />
		{:else}
			<div class="p-12">
				<ModalWarning
					title="No Favorites!"
					text="Hold on a minute! You haven't favorited any activities yet. Get
            on it!"
				/>
			</div>
		{/if}
	</div>

	<div slot="footer">
		<Sponsor />
	</div>
</StackedLayout>
