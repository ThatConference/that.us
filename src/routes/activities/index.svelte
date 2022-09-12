<script context="module">
	import sessionsApi from '$dataSources/api.that.tech/sessions';

	export async function load({ fetch }) {
		const { querySessionsByDate } = sessionsApi(fetch);

		return {
			props: {
				activities: await querySessionsByDate({ pageSize: 100 })
			}
		};
	}
</script>

<script>
	export let activities;

	import { session } from '$app/stores';
	import { useMachine } from '@xstate/svelte';
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import lodash from 'lodash';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import ActivityList from '$components/activities/List.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';
	import Seo from '$components/Seo.svelte';

	import { Waiting, ActionHeader } from '$elements';
	import { Chevron } from '$elements/svgs';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';

	import createMachine from './_machines/daily';

	const { isEmpty, uniqBy } = lodash;

	const metaTags = ((
		title = 'View all of the activities, sessions and more for THAT and THAT Conference.'
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `Every activity for all events are listed here. Sessions, workshops, keynots, we mean everything.`,
			ogImages: {
				twitter: 'activities-Twitter.jpg',
				facebook: 'activities-Facebook.jpg',
				linkedIn: 'activities-LinkedIn.jpg'
			},
			openGraph: {
				type: 'website',
				url: `https://that.us/activities`
			}
		})
	}))();

	let createDisabled = true;
	let scrollThreshold = 1200;

	const { state, send } = useMachine(
		createMachine({
			items: activities.sessions.filter((s) => s),
			cursor: activities.cursor,
			events: uniqBy([...activities.sessions.filter((s) => s).map((e) => e.event)], (i) => i.id)
		}),
		{
			devTools: debug.xstate
		}
	);

	$: if (!isEmpty($session.thatProfile)) {
		createDisabled = false;
	}

	function handleNext() {
		send('NEXT');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ScrollThreshold bind:scrollThreshold />
<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Daily Activities">
			{#if !createDisabled}
				<HighlightLink href="/activities/create/">Create Activity</HighlightLink>
			{/if}
		</ActionHeader>
	</div>

	<div slot="body">
		<ActivityList activities={$state.context.items} events={$state.context.events} />

		<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleNext} />

		{#if ['loaded'].some($state.matches)}
			<div class="mt-12 flex flex-col items-center text-gray-400">
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
