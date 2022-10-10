<script>
	// utilities
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Warning } from '$elements/svgs';

	let awardedBadges = [];

	$: if ($page.data.user.profile?.earnedMeritBadges) {
		awardedBadges = [...$page.data.user.profile.earnedMeritBadges];
	}

	const metaTags = ((title = 'My Merit Badges - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "You've worked hard to earn some awesome merit badges.",
			openGraph: {
				type: 'website',
				url: `https://that.us/my/settings/badges/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<header>
		<h2 class="text-xl font-bold leading-6 text-gray-900">Your Merit Badges</h2>
	</header>

	{#if awardedBadges.length > 0}
		<div class="mt-12">
			<div class="flex justify-around space-x-3">
				{#each awardedBadges as badge (badge.id)}
					<div class="flex flex-col items-center">
						<img class="lazyload h-24 w-24" src={badge.image} alt={badge.name} />
						<h2 class="text-xl font-bold leading-6 tracking-tight text-gray-500">
							{badge.name}
						</h2>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="mt-8">
			<div class="flex items-center">
				<div class="mr-4">
					<Warning classes="h-12 w-12 text-red-500" />
				</div>

				<h2 class="prose-xl text-gray-500">
					Wait, our records seem to indicate you don't have a merit badge yet.
				</h2>
			</div>
		</div>
	{/if}
</div>
