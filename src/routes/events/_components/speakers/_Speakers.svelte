<!-- <script context="module">
	//TODO: speakers
	import speakersApi from '$dataSources/api.that.tech/speakers/queries';

	export async function load({ fetch }) {
		//TODO: speakers
		const { querySpeakers } = speakersApi(fetch);

		return {
			props: {
				//TODO: speakers
				speakers: await querySpeakers()
			}
		};
	}
</script> -->
<script>
	import membersApi from '$dataSources/api.that.tech/members/queries';

	export let event;

	//TODO: fixup this hack to get the real list
	async function getInitialSpeakers(e) {
		const { queryMembers } = membersApi(fetch);
		const speakers = await queryMembers();
		return speakers;
	}

	const speakers = getInitialSpeakers(event);

	console.log('speakers', speakers);

	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { useMachine } from 'xstate-svelte';

	// import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';
	import { Waiting } from '$elements';
	//import Layout from '$elements/layouts/ContentLayout.svelte';
	// import Seo from '$components/Seo.svelte';
	//import Hero from '$components/members/Hero.svelte';

	//TODO: speaker card???
	import MemberCard from '$components/members/MemberCard.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';

	import speakerMachine from './_machines/speakers';
	import { pick } from 'lodash';

	// const metaTags = ((title = 'Members - THAT') => ({
	// 	title,
	// 	tags: seoMetaTags({
	// 		title,
	// 		description:
	// 			'Our community is made of up geeks and geeklings across the world. Here are just a few.',
	// 		openGraph: {
	// 			type: 'website',
	// 			url: `https://that.us/members`
	// 		}
	// 	})
	// }))();

	const { state, send } = useMachine(
		//speakerMachine({ items: speakers.speakers, cursor: speakers.cursor }),
		speakerMachine({ items: [], cursor: null }),
		{
			devTools: debug.xstate
		}
	);

	let scrollThreshold = 1200;

	function handleLoadMore() {
		send('NEXT');
	}

	console.log('event', event);

	function filterMemberData(m) {
		return pick(m, [
			'firstName',
			'lastName',
			'jobTitle',
			'company',
			'profileImage',
			'profileSlug',
			'earnedMeritBadges',
			'profileLinks'
		]);
	}
</script>

<!-- <Seo title={metaTags.title} tags={metaTags.tags} /> -->

<ScrollThreshold bind:scrollThreshold />
<!-- <Layout> -->
<!-- <main class="overflow-hidden">
	<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
		<div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
			<main> -->
<section class="py-12 lg-py-16 bg-thatBlue-700">
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<!-- <Hero /> -->
		<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
			<h2 class="text-3xl leading-9 font-extrabold text-white tracking-tight sm:text-4xl">
				Featured Speakers
			</h2>
			<p class="text-xl leading-7 text-gray-300">
				<!-- Do you have a ticket? Add your activity today!  -->View the
				<span class="pl:2 text-that-orange hover:text-thatOrange-500"
					><a href="/event/{event.slug}/speakers">entire speaker list (TODO).</a></span
				>
			</p>
		</div>

		<ul
			class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
								lg:grid-cols-5"
		>
			{#each $state.context.items as m, i (m.id)}
				<li class="col-span-1">
					<MemberCard {...filterMemberData(m)} />
				</li>
			{/each}
			<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleLoadMore} />
		</ul>
		{#if ['loadingNext', 'loadedAll'].some($state.matches)}
			<div class="flex flex-grow justify-center py-12">
				<Waiting />
			</div>
		{/if}
	</div>
</section>
<!-- </main>
		</div>
	</div>
</main> -->
<!-- </Layout> -->
