<script context="module">
	import communitiesApi from '$dataSources/api.that.tech/community/queries';

	export async function load({ fetch }) {
		const { queryAllCommunities } = communitiesApi(fetch);

		return {
			props: {
				communities: await queryAllCommunities()
			}
		};
	}
</script>

<script>
	export let communities;

	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';
	import Seo from '$components/Seo.svelte';
	import { Waiting } from '$elements';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import CommunityCard from '$components/communities/CommunityCard.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';

	import Hero from './_components/_CommunitiesHero.svelte';
	import createMachine from './_machines/communities';

	const metaTags = ((title = 'Communities - THAT') => ({
		title,
		tags: seoMetaTags({
			title: 'Communities - THAT',
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/communities`
			}
		})
	}))();

	const { state, send } = useMachine(createMachine({ items: communities }), {
		devTools: debug.xstate
	});

	let scrollThreshold = 1200;

	function handleNext() {
		send('NEXT');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ScrollThreshold bind:scrollThreshold />
<Layout>
	<main class="overflow-hidden">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
				<main>
					<Hero />
					<div class="py-20">
						<div class="px-8">
							<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
								{#each $state.context.items as c (c.id)}
									<li
										class="col-span-1 bg-white rounded-lg shadow transition duration-500 ease-in-out transform hover:scale-105 hover:bg-that-offWhite"
									>
										<a
											href={`/communities/${c.slug}`}
											class="h-full flex flex-col justify-between p-4 text-center focus:outline-none"
										>
											<CommunityCard community={c} />
										</a>
									</li>
								{/each}

								<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleNext} />
							</ul>

							{#if ['loadingNext', 'loadedAll'].some($state.matches)}
								<div class="flex flex-grow justify-center py-12">
									<Waiting />
								</div>
							{/if}
						</div>
					</div>
				</main>
			</div>
		</div>
	</main>
</Layout>
