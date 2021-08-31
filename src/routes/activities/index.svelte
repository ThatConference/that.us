<script>
	import { useMachine } from 'xstate-svelte';
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { isEmpty } from 'lodash';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import ActivityList from '$components/activities/List.svelte';
	import CardLoader from '$components/CardLoader.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';

	import { Waiting, ActionHeader } from '$elements';
	import { Chevron } from '$elements/svgs';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';
	import { getAuth } from '$utils/security';
	import createMachine from './_machines/daily';

	const { thatProfile } = getAuth();
	const metaTags = seoMetaTags({
		title: 'Daily Activities - THAT',
		description: `THAT Daily Activities || 'Activities'}.`,
		openGraph: {
			type: 'website',
			url: `https://that.us/activities`
		}
	});

	let createDisabled = true;
	let scrollThreshold = 1200;

	const { state, send } = useMachine(createMachine(), {
		devTools: debug.xstate
	});

	$: if (!isEmpty($thatProfile)) {
		createDisabled = false;
	}

	function handleNext() {
		send('NEXT');
	}
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<ScrollThreshold bind:scrollThreshold />
<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Daily Activities">
			{#if !createDisabled}
				<aButton href="/activities/create" text="Create Activity" />
			{/if}
		</ActionHeader>
	</div>

	<div slot="body">
		{#if ['init'].some($state.matches)}
			<CardLoader />
		{:else}
			<ActivityList activities={$state.context.items} events={$state.context.events} />

			<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleNext} />
		{/if}

		{#if ['loaded'].some($state.matches)}
			<div class="mt-12 text-gray-400 flex flex-col items-center">
				scroll for more <Chevron />
			</div>
		{/if}

		{#if ['loadingNext', 'loadedAll'].some($state.matches)}
			<div class="flex flex-grow justify-center py-12">
				<Waiting />
			</div>
		{/if}
	</div>

	<div slot="footer">
		<Sponsor eventId={$state.context.eventId} />
	</div>
</StackedLayout>
