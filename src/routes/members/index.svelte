<script context="module">
	import membersApi from '$dataSources/api.that.tech/members/queries';

	export async function load({ fetch }) {
		const { queryMembers } = membersApi(fetch);

		return {
			props: {
				members: await queryMembers()
			}
		};
	}
</script>

<script>
	export let members;

	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';
	import { Waiting } from '$elements';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import Seo from '$components/Seo.svelte';
	import Hero from '$components/members/Hero.svelte';
	import MemberCard from '$components/members/MemberCard.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';

	import memberMachine from './_machines/members';

	const metaTags = ((title = 'Members - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description:
				'Our community is made of up geeks and geeklings across the world. Here are just a few.',
			ogImages: {
				twitter: 'members-Twitter.jpg',
				facebook: 'members-Facebook.jpg',
				linkedIn: 'members-LinkedIn.jpg'
			},
			openGraph: {
				type: 'website',
				url: `https://that.us/members`
			}
		})
	}))();

	const { state, send } = useMachine(
		memberMachine({ items: members.members, cursor: members.cursor }),
		{
			devTools: debug.xstate
		}
	);

	let scrollThreshold = 1200;

	function handleLoadMore() {
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
							<ul
								class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                  lg:grid-cols-5"
							>
								{#each $state.context.items as m, i (m.id)}
									<li class="col-span-1">
										<MemberCard {...m} />
									</li>
								{/each}
								<SvelteInfiniteScroll
									window
									threshold={scrollThreshold}
									on:loadMore={handleLoadMore}
								/>
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
