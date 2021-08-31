<script>
	// todo.. What do we do in the scenario where the event isn't found?

	import { page } from '$app/stores';
	import { useMachine } from 'xstate-svelte';
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { isEmpty } from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import { getAuth } from '$utils/security';
	import { debug } from '$utils/config';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import ActivityList from '$components/activities/List.svelte';
	import CardLoader from '$components/CardLoader.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';

	import { Waiting, ActionHeader } from '$elements';
	import { Chevron } from '$elements/svgs';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	import createMachine from './_machines/event';

	const { thatProfile } = getAuth();
	const { id, name } = $page.params;
	const eventSlug = `${id}/${name}`;

	let scrollThreshold = 1200;
	let createDisabled = true;

	const { state, send } = useMachine(createMachine(eventSlug), {
		devTools: debug.xstate
	});

	// todo.. this should be something around has a ticket.
	$: if (!isEmpty($thatProfile)) {
		createDisabled = false;

		if ($state.context.hasEnded) createDisabled = true;
	}

	let metaTags;
	$: {
		const metaTags = seoMetaTags({
			title: `${$state.context.name || 'Activities'} - THAT`,
			description: `Activities for ${$state.context.name || 'Activities'}.`,
			openGraph: {
				type: 'website',
				url: `https://that.us/events/${eventSlug}`
			}
		});
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
		<ActionHeader title={$state.context.name}>
			{#if !createDisabled}
				{#if $state.context.eventId}
					<aButton
						href={`/activities/create#/event/${$state.context.eventId}`}
						text="Create Activity"
					/>
				{/if}
			{/if}
		</ActionHeader>
	</div>

	<div slot="body">
		{#if ['init'].some($state.matches)}
			<CardLoader />
		{:else}
			<ActivityList activities={$state.context.items} />

			<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleNext} />
		{/if}

		{#if $state.context.items > 0}
			{#if ['loaded'].some($state.matches)}
				<div class="mt-12 text-gray-400 flex flex-col items-center">
					scroll for more <Chevron />
				</div>
			{/if}
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
