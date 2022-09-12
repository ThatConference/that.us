<script>
	export let event;

	import { useMachine } from '@xstate/svelte';
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';

	import Seo from '$components/Seo.svelte';

	import Busy from '$elements/Busy.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';
	import ActivityList from '$components/activities/List.svelte';

	import { Chevron } from '$elements/svgs';

	import createMachine from '../../_machines/event';

	const { sessions } = event;

	let scrollThreshold = 1200;

	const { state, send } = useMachine(
		createMachine({
			items: sessions.sessions.filter((s) => s),
			cursor: sessions.cursor,
			eventSlug: event.slug
		}),
		{
			devTools: debug.xstate
		}
	);

	const metaTags = ((title = `${event.name} activities.`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `Activities for ${event.name}.`,
			openGraph: {
				type: 'website',
				url: `https://that.us/activities/${event.slug}`
			}
		})
	}))();

	function handleLoadMore() {
		send('NEXT');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ScrollThreshold bind:scrollThreshold />

<div class="relative -mt-12 flex-grow">
	<div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
		<div class="rounded-xl bg-gray-100 px-5 py-6 shadow sm:px-6">
			{#if ['init'].some($state.matches)}
				<Busy />
			{:else}
				<ActivityList activities={$state.context.items} />

				<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleLoadMore} />
			{/if}

			{#if $state.context.items > 0}
				{#if ['loaded'].some($state.matches)}
					<div class="mt-12 flex flex-col items-center text-gray-400">
						scroll for more <Chevron />
					</div>
				{/if}
			{/if}

			{#if ['loadingNext', 'loadedAll'].some($state.matches)}
				<div class="flex flex-grow justify-center py-12">
					<Busy />
				</div>
			{/if}
		</div>
	</div>
</div>
