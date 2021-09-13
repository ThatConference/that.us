<script>
	import loading from '$stores/loading';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ModalError, ModalWarning, ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import CardLoader from '$components/CardLoader.svelte';
	import ActivityList from '$components/activities/List.svelte';

	import favoritesApi from '$dataSources/api.that.tech/favorites';
	import currentEvent from '$stores/currentEvent';

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

	const { get } = favoritesApi();

	function queryFavorites() {
		return get($currentEvent.eventId);
	}
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
		{#await queryFavorites() then activities}
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
		{:catch error}
			<ModalError
				title="KABOOM!"
				text="I'm sorry, bugs are features right? If I were you, I'd refresh the
        page right now."
				action={{ title: 'Return to Activities', href: '/activities' }}
			/>
		{/await}
	</div>

	<div slot="footer">
		<Sponsor />
	</div>
</StackedLayout>
