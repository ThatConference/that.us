<script>
	export let data;

	import Icon from 'svelte-awesome';
	import { copyRegular } from '$components/svelte-awesome-icons';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ModalWarning, ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import ActivityList from '$components/activities/List.svelte';
	import favoritesMutationsApi from '$dataSources/api.that.tech/me/favorites/mutations';

	let { activities, profile } = data;
	let iCalUrl = profile.favoritesICalendarUrl;
	let { rotateICalendarUrl } = favoritesMutationsApi();

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
		<div>
			<div class="overflow-x-auto">
				<h2 class="font-bold leading-9 text-thatBlue-800 sm:text-xl md:text-2xl">
					Favorites ICAL Feed
				</h2>
				<span class="w-8 overflow-hidden text-gray-500">{iCalUrl}</span>
				<button
					class="px-1 text-gray-600 hover:text-thatOrange-400"
					title="copy to clipboard"
					on:click={async () => await navigator.clipboard.writeText(iCalUrl)}>
					<Icon data={copyRegular} label="copy to clipboard" />
				</button>
			</div>
			<div>
				<button
					type="button"
					class="mt-2 block text-xs text-gray-500 hover:text-thatOrange-400"
					on:click={async () => {
						iCalUrl = await rotateICalendarUrl();
					}}>
					Click me to rotate url
				</button>
			</div>
		</div>
		{#if activities.length > 0}
			<ActivityList reverse={true} {activities} />
		{:else}
			<div class="p-12">
				<ModalWarning
					title="No Favorites!"
					text="Hold on a minute! You haven't favorited any activities yet. Get
            on it!" />
			</div>
		{/if}
	</div>

	<div slot="footer">
		<Sponsor />
	</div>
</StackedLayout>
