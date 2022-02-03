<script context="module">
	import communityQueryApi from '$dataSources/api.that.tech/community/queries';

	export async function load({ params, fetch }) {
		const { community } = params;
		const { queryCommunityBySlug, queryCommunityFollowers, queryCommunityActivities } =
			communityQueryApi(fetch);

		const [communityDetails, communityFollowers, communityActivities] = await Promise.all([
			queryCommunityBySlug(community),
			queryCommunityFollowers(community),
			queryCommunityActivities({ slug: community })
		]);

		return {
			props: {
				communityDetails,
				communityFollowers: communityFollowers.followers.members,
				communityActivities: communityActivities.sessions
			}
		};
	}
</script>

<script>
	export let communityDetails;
	export let communityFollowers;
	export let communityActivities;

	import { session } from '$app/stores';
	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import communityMutationApi from '$dataSources/api.that.tech/community/mutations';
	import meQueryApi from '$dataSources/api.that.tech/me/queries';

	import UpNext from './_components/upNext.svelte';
	import NewestFollowers from './_components/newestFollowers.svelte';
	import CTA from './_components/cta.svelte';
	import Hero from './_components/hero.svelte';

	const { toggleFollow } = communityMutationApi();
	const { queryMeFollowingCommunities } = meQueryApi();

	const metaTags = ((title = `${communityDetails.name} community spotlight on THAT.`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${communityDetails.description}`,
			openGraph: {
				type: 'website',
				url: `https://that.us/communities/${communityDetails.slug}`
			}
		})
	}))();

	let delayCounter = 200;
	$: userIsFollowing = false;
	$: if ($session.isAuthenticated) {
		queryMeFollowingCommunities().then((r) => {
			userIsFollowing = r.includes(communityDetails.id);
		});
	}

	function getDelay(reset = false) {
		let current = delayCounter;
		delayCounter = delayCounter + 200;

		if (reset) delayCounter = 200;
		return current;
	}

	async function follow(slug) {
		userIsFollowing = await toggleFollow(slug);
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="flex flex-col">
	<div in:fade={{ delay: getDelay() }}>
		<Hero
			community={communityDetails}
			isFollowing={userIsFollowing}
			on:community-follow={() => follow(communityDetails.id)}
		/>
	</div>

	<div in:fade={{ delay: getDelay() }}>
		<NewestFollowers followers={communityFollowers} />
	</div>

	<div in:fade={{ delay: getDelay() }}>
		<UpNext activities={communityActivities} />
	</div>

	<div in:fade={{ delay: getDelay(true) }}>
		<CTA
			community={communityDetails}
			isFollowing={userIsFollowing}
			on:community-follow={() => follow(communityDetails.id)}
		/>
	</div>
</div>
