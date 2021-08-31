<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import { ModalError, ModalWarning, ActionHeader, LinkButton } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import CardLoader from '$components/CardLoader.svelte';
	import ActivityList from '$components/activities/List.svelte';

	import favoritesApi from '$dataSources/api.that.tech/favorites';
	import currentEvent from '$stores/currentEvent';

	const metaTags = seoMetaTags({
		title: 'My Favorites - THAT',
		description: "You're list of favorited activities.",
		openGraph: {
			type: 'website',
			url: `https://that.us/my/favorites`
		},
		noindex: true,
		nofollow: true
	});

	const { get } = favoritesApi();
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="My Favorites">
			<aButton href="/activities" text="Return to Activities" />
		</ActionHeader>
	</div>

	<div slot="body">
		{#await get($currentEvent.eventId)}
			<CardLoader />
		{:then activities}
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
