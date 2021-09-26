<script>
	import { page, session } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { useMachine } from 'xstate-svelte';

	import { debug } from '$utils/config';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ProfileLayout from '$elements/layouts/Profile.svelte';

	import Hero from '../_components/_Hero.svelte';
	import FeaturedMembers from '../_components/_FeaturedMembers.svelte';
	import Goals from '../_components/_Goals.svelte';
	import Followers from '../_components/_Followers.svelte';
	import CTA from '../_components/_CTA.svelte';
	import JobListings from '../_components/_JobListings.svelte';
	import FeaturedSessions from '../_components/_FeaturedSessions.svelte';
	import PartnerCta from '../_components/_PartnerCta.svelte';

	import createMachine from '../_machines/partner';

	const { partner } = $page.params;

	const { state, send } = useMachine(createMachine(partner), {
		devTools: debug.xstate
	});

	let metaTags;

	// todo - we need to look into how things now load
	$: if (['profileLoaded'].some($state.matches)) {
		const { profile } = $state.context;

		metaTags = ((title = `${profile.companyName} - THAT`) => ({
			title,
			tags: seoMetaTags({
				title,
				description: `${profile.aboutUs}`,
				openGraph: {
					type: 'website',
					url: `https://that.us/partners/${partner}`
				}
			})
		}))();
	}

	$: if ($session.isAuthenticated) {
		send('AUTHENTICATED', { status: true });
	} else {
		send('AUTHENTICATED', { status: false });
	}

	let delayCounter = 200;

	function getDelay(reset = false) {
		let current = delayCounter;
		delayCounter = delayCounter + 200;

		if (reset) delayCounter = 200;
		return current;
	}
</script>

<Seo title={metaTags?.title || ''} tags={metaTags?.tags || []} />

<ProfileLayout>
	{#if ['profileLoaded'].some($state.matches)}
		<div class="flex flex-col">
			<div in:fade={{ delay: getDelay() }}>
				<Hero
					partner={$state.context.profile}
					isFollowing={$state.context.isFollowing}
					wasContactExchanged={$state.context.leadAdded}
					on:TOGGLE_FOLLOW={() =>
						send('FOLLOW', {
							id: $state.context.profile.id
						})}
					on:XCHANGE_CONTACT={() =>
						send('XCHANGE_CONTACT', {
							id: $state.context.profile.id
						})}
				/>
			</div>

			{#if $state?.context?.profile?.members?.length > 0}
				<div in:fade={{ delay: getDelay() }}>
					<FeaturedMembers members={$state.context.profile.members} />
				</div>
			{/if}

			{#if $state?.context?.profile?.goals?.length > 0}
				<div in:fade={{ delay: getDelay() }}>
					<Goals goals={$state.context.profile.goals} />
				</div>
			{/if}

			{#if $state?.context?.profile?.callToActionSpotlight}
				<div in:fade={{ delay: getDelay() }}>
					<PartnerCta
						action={$state.context.profile.callToActionSpotlight}
						url={$state.context.profile.callToActionUrl}
					/>
				</div>
			{/if}

			{#if $state?.context?.profile?.sessions?.length > 0}
				<div in:fade={{ delay: getDelay() }}>
					<FeaturedSessions sessions={$state.context.profile.sessions} />
				</div>
			{/if}

			{#if $state?.context?.profile?.jobListings?.length > 0}
				<div in:fade={{ delay: getDelay() }}>
					<JobListings listings={$state.context.profile.jobListings} />
				</div>
			{/if}

			<div in:fade={{ delay: getDelay(true) }}>
				<div in:fade={{ delay: getDelay() }}>
					<Followers stateMachineService={$state.context.followMachineServices} />
				</div>

				<CTA
					partner={$state.context.profile}
					isFollowing={$state.context.isFollowing}
					on:TOGGLE_FOLLOW={() =>
						send('FOLLOW', {
							id: $state.context.profile.id
						})}
				/>
			</div>
		</div>
	{/if}
</ProfileLayout>
