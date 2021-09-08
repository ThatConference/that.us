<script>
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { useMachine } from 'xstate-svelte';

	import { debug } from '$utils/config';
	import seoMetaTags from '$utils/seo/metaTags';

	import Seo from '$components/Seo.svelte';
	import PartnerCard from '$components/partners/PartnerCard.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';
	import { Waiting } from '$elements';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import Hero from '../_components/_PastPartnersHero.svelte';
	import partnerMachine from '../_machines/pastPartners';

	const metaTags = ((title = 'Past Partners - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Thank you to those who support our great community every day.',
			openGraph: {
				type: 'website',
				url: `https://that.us/partners/past`
			}
		})
	}))();

	const { state, send } = useMachine(partnerMachine(), {
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
				<Hero />
				<div class="mt-12 py-12">
					{#if ['init'].some($state.matches)}
						<div class="mb-24 w-full flex flex-col items-center justify-center">
							<Waiting />
						</div>
					{/if}

					<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{#each $state.context.items as p, i (p.id)}
							<li
								class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow transition duration-500 ease-in-out transform hover:scale-105 hover:bg-that-offWhite"
							>
								<a open href={`/partners/${p.slug}`}>
									<PartnerCard {...p} />
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
		</div>
	</main>
</Layout>
