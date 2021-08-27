<script>
	import { fade } from 'svelte/transition';
	import { useMachine } from 'xstate-svelte';

	import Layout from '$elements/layouts/ContentLayout.svelte';
	import UpNext from '$components/activities/UpNext.svelte';
	import {
		Hero,
		Testimonials,
		CTA,
		CtaMembership,
		Newsletter,
		Stats,
		Events,
		NewMembers
	} from '$components/home';

	import { isAuthenticated, thatProfile } from '$utils/security';
	import seoMetaTags from '$utils/seo/metaTags';
	import currentEvent from '$stores/currentEvent';

	import WelcomeBack from './_root/components/_WelcomeBack.svelte';
	import createMachine from './_root/machines/home';

	const { state } = useMachine(createMachine({ id: $currentEvent.eventId }), {
		debug: true
	});

	const metaTags = seoMetaTags({
		title: 'Welcome to THAT!',
		description: 'todo',
		openGraph: {
			type: 'website',
			url: `https://that.us/`
		}
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>
	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<Layout>
	{#if $thatProfile?.isMember}
		<div in:fade={{ delay: 200 }}>
			<WelcomeBack />
		</div>
		<div in:fade={{ delay: 400 }}>
			<UpNext stateMachineService={$state.context.upNextActor} />
		</div>
		<div in:fade={{ delay: 600 }}>
			<Events />
		</div>
		<div in:fade={{ delay: 800 }}>
			<Stats stateMachineService={$state.context.statsActor} />
			<NewMembers />
			<Newsletter />
		</div>
	{:else}
		<div in:fade={{ delay: 200 }}>
			<Hero />
		</div>

		<div in:fade={{ delay: 400 }}>
			<Stats stateMachineService={$state.context.statsActor} />
		</div>

		<div in:fade={{ delay: 600 }}>
			<Testimonials />
		</div>

		<div in:fade={{ delay: 800 }}>
			<div class="relative flex flex-col items-center">
				<img class="h-72" src="/images/THAT-Logo-Words.svg" alt="THAT" loading="lazy" />
			</div>

			<UpNext stateMachineService={$state.context.upNextActor} />
			<Events />

			{#if !$isAuthenticated}
				<CTA />
			{:else if !$thatProfile?.isMember}
				<CtaMembership />
			{/if}

			<NewMembers />
			<Newsletter />
		</div>
	{/if}
</Layout>
