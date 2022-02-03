<script context="module">
	import memberQueryApi from '$dataSources/api.that.tech/members/queries';
	import meQueryApi from '$dataSources/api.that.tech/me/queries';

	export async function load({ params, fetch, session }) {
		const { queryMemberBySlug, queryFollowers } = memberQueryApi(fetch);
		const { queryMeFollowingMembers } = meQueryApi(fetch);

		let { member } = params;

		let [profile, followers, myFollowers = []] = await (async () => {
			if (session.isAuthenticated) {
				return await Promise.all([
					queryMemberBySlug(member),
					queryFollowers(member),
					queryMeFollowingMembers()
				]);
			} else {
				return await Promise.all([queryMemberBySlug(member), queryFollowers(member)]);
			}
		})();

		return {
			props: {
				memberSlug: member,
				profile,
				followers,
				isFollowing: myFollowers.includes(profile.id)
			}
		};
	}
</script>

<script>
	export let memberSlug;
	export let profile;
	export let followers;
	export let isFollowing;

	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import ProfileLayout from '$elements/layouts/Profile.svelte';
	import Seo from '$components/Seo.svelte';
	import memberMutationApi from '$dataSources/api.that.tech/members/mutations';

	import UpNext from '../_components/upNext.svelte';
	import Followers from '../_components/followers.svelte';
	import CTA from '../_components/cta.svelte';
	import LifeHack from '../_components/lifeHack.svelte';
	import MeritBadges from '../_components/meritBadges.svelte';
	import Hero from '../_components/hero.svelte';

	const { toggleFollow } = memberMutationApi();

	let delayCounter = 200;

	const metaTags = ((title = `${profile.firstName} ${profile.lastName} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${profile.bio}`,
			openGraph: {
				url: `https://that.us/members/${memberSlug}`
			}
		})
	}))();

	function getDelay() {
		let current = delayCounter;
		delayCounter = delayCounter + 200;

		return current;
	}

	async function followProfile(slug) {
		const r = await toggleFollow(slug);
		isFollowing = r;
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ProfileLayout>
	<div class="flex flex-col">
		<div in:fade={{ delay: getDelay() }}>
			<Hero {isFollowing} member={profile} on:TOGGLE_FOLLOW={() => followProfile(memberSlug)} />
		</div>

		{#if profile.lifeHack}
			<div in:fade={{ delay: getDelay() }}>
				<LifeHack quote={profile.lifeHack} name={`${profile.firstName} ${profile.lastName}`} />
			</div>
		{/if}

		<div in:fade={{ delay: getDelay() }}>
			<UpNext profileSlug={memberSlug} />
		</div>

		<div in:fade={{ delay: getDelay() }}>
			<Followers followers={followers.followers.profiles} />

			{#if profile.earnedMeritBadges.length > 0}
				<MeritBadges meritBadges={profile.earnedMeritBadges} />
			{/if}

			<CTA {isFollowing} {profile} on:TOGGLE_FOLLOW={() => followProfile(memberSlug)} />
		</div>
	</div>
</ProfileLayout>
