<script context="module">
	import membersApi from '$dataSources/api.that.tech/members/queries';

	export async function load({ page, fetch, session, context }) {
		const { queryMembers } = membersApi(fetch);

		return {
			props: {
				members: await queryMembers(15).then((r) => r.members),
				events,
				activities
			}
		};
	}
</script>

<script>
	export let members;
	export let events;
	export let activities;
	export let stats;

	import { fade } from 'svelte/transition';
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { getAuth } from '$utils/security';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import Seo from '$components/Seo.svelte';
	import UpNext from '$components/activities/UpNext.svelte';

	import {
		Hero,
		Testimonials,
		CTA,
		CtaMembership,
		Newsletter,
		Stats,
		Events,
		NewMembers,
		WelcomeBack
	} from './_root/components';

	import currentEvent from '$stores/currentEvent';

	import createMachine from './_root/machines/home';

	const { thatProfile, isAuthenticated } = getAuth();
	const metaTags = ((title = 'Welcome to THAT!') => ({
		title,
		tags: seoMetaTags({
			title,
			description:
				'THAT is your new go-to peer-to-peer learning platform where real practitioners come together daily, monthly, and yearly.  Join on the 15th of every month for THAT Online and this July at THAT Conference.'
		})
	}))();

	let { state } = useMachine(createMachine({ id: $currentEvent.eventId }), {
		debug: true
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

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
			<NewMembers {members} />
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

			<NewMembers {members} />
			<Newsletter />
		</div>
	{/if}
</Layout>
