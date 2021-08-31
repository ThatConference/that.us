<script>
	export let slug;

	import { fade } from 'svelte/transition';
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import UpNext from '$components/activities/UpNext.svelte';
	import { debug } from '$utils/config';
	import { getAuth } from '$utils/security';

	import NewestFollowers from './_NewestFollowers.svelte';
	import CTA from './_CTA.svelte';
	import Hero from './_Hero.svelte';
	import createMachine from './machines/community';

	const { isAuthenticated, token } = getAuth();
	let metaTags;

	$: if (['communityLoaded'].some($state.matches)) {
		const { community } = $state.context;

		metaTags = seoMetaTags({
			title: `${community.name} - THAT`,
			description: ``,
			openGraph: {
				type: 'website',
				url: `https://that.us/communities/${community.slug}`
			}
		});
	}

	const { state, send } = useMachine(createMachine(slug), {
		devTools: debug.xstate
	});

	let delayCounter = 200;

	function getDelay(reset = false) {
		let current = delayCounter;
		delayCounter = delayCounter + 200;

		if (reset) delayCounter = 200;
		return current;
	}

	$: if ($isAuthenticated && $token) {
		send('AUTHENTICATED', { status: true });
	} else {
		send('AUTHENTICATED', { status: false });
	}
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

{#if ['communityLoaded'].some($state.matches)}
	<div class="flex flex-col">
		<div in:fade={{ delay: getDelay() }}>
			<Hero
				community={$state.context.community}
				isFollowing={$state.context.isFollowing}
				on:community-follow={() =>
					send('FOLLOW', {
						id: $state.context.community.id
					})}
			/>
		</div>

		<div in:fade={{ delay: getDelay() }}>
			<NewestFollowers stateMachineService={$state.context.followMachineServices} />
		</div>

		<div in:fade={{ delay: getDelay() }}>
			<UpNext stateMachineService={$state.context.activitiesMachineServices} />
		</div>

		<div in:fade={{ delay: getDelay(true) }}>
			<CTA
				isFollowing={$state.context.isFollowing}
				community={$state.context.community}
				on:community-follow={() =>
					send('FOLLOW', {
						id: $state.context.community.id
					})}
			/>
		</div>
	</div>
{/if}
