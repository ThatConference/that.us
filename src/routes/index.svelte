<script context="module">
	import membersApi from '$dataSources/api.that.tech/members/queries';
	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import statsApi from '$dataSources/api.that.tech/stats/queries';
	import sessionsApi from '$dataSources/api.that.tech/sessions';

	//blog
	import { getPosts } from '$blog/getPosts';

	export async function load({ fetch }) {
		const { queryMembers, queryBlogAuthorBySlug } = membersApi(fetch);
		const { queryEventsByCommunity, queryEventForCfp } = eventsApi(fetch);
		const { queryCommunityStats } = statsApi(fetch);
		const { querySessionsByDate } = sessionsApi(fetch);

		const rawPosts = getPosts({ limit: 6 });

		// todo - some of these graph calls could be combined.
		// todo - we could pick off the cfp from the event already queried.
		// todo - "up next event" should come from somewhere.

		const [members, events, stats, nextHybridEvent, activitiesUpNext, blogPosts] =
			await Promise.all([
				queryMembers(15),
				queryEventsByCommunity(),
				queryCommunityStats(),
				queryEventForCfp('tx/2022'),
				querySessionsByDate({ pageSize: 6 }),
				Promise.all(
					rawPosts.map(async (p) => {
						const author = await queryBlogAuthorBySlug(p.metadata.authorSlug);

						return {
							...p,
							metadata: {
								...p.metadata,
								author
							}
						};
					})
				)
			]);

		return {
			props: {
				members: members.members,
				events,
				stats,
				nextHybridEvent,
				activitiesUpNext,
				blogPosts
			}
		};
	}
</script>

<script>
	export let members;
	export let events;
	export let stats;
	export let nextHybridEvent;
	export let activitiesUpNext;
	export let blogPosts;

	import { session } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { useMachine } from 'xstate-svelte';

	import { debug } from '$utils/config';
	import seoMetaTags from '$utils/seo/metaTags';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import Seo from '$components/Seo.svelte';

	import CfpCta from '$components/cta/_HomePageCFP.svelte';
	import TicketsOnSale from '$components/cta/_TicketsOnSale.svelte';

	import {
		Hero,
		Testimonials,
		CTA,
		CtaMembership,
		Newsletter,
		Stats,
		Events,
		NewMembers,
		WelcomeBack,
		UpNext,
		BlogLatest
	} from './_root/components';

	import createMachine from './_root/machines/upNext';

	const metaTags = ((
		title = 'Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share and learn together. Home of THAT Conference.'
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description:
				'Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share and learn together. We geek-out in Texas and Wisconsin once a year but we host digital events all the time. Home of THAT Conference.'
		})
	}))();

	const { state, send } = useMachine(
		createMachine({
			items: activitiesUpNext.sessions.filter((s) => s),
			cursor: activitiesUpNext.cursor
		}),
		{
			debug: debug.xstate
		}
	);
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	{#if $session.thatProfile?.isMember}
		<div in:fade={{ delay: 200 }}>
			<WelcomeBack />
		</div>

		<div in:fade={{ delay: 400 }}>
			<UpNext
				items={$state.context.items}
				hasMore={$state.context.cursor ? true : false}
				on:next={() => {
					send('NEXT');
				}}
			/>
		</div>

		<div in:fade={{ delay: 600 }}>
			<Events {events} />
		</div>

		<div in:fade={{ delay: 800 }}>
			<Stats {stats} />
			<BlogLatest posts={blogPosts} />
			<NewMembers {members} />
			<Newsletter />
		</div>
	{:else}
		<div in:fade={{ delay: 200 }}>
			<Hero>
				{#if nextHybridEvent.isCallForSpeakersOpen}
					<CfpCta event={nextHybridEvent} />
				{:else}
					<TicketsOnSale event={nextHybridEvent} />
				{/if}
			</Hero>
		</div>

		<div in:fade={{ delay: 400 }}>
			<Stats {stats} />
		</div>

		<div in:fade={{ delay: 600 }}>
			<Testimonials />
		</div>

		<div in:fade={{ delay: 800 }}>
			<div class="relative flex flex-col items-center">
				<img class="lazyload h-72" src="/images/THAT-Logo-Words.svg" alt="THAT" />
			</div>

			<UpNext
				items={$state.context.items}
				hasMore={$state.context.cursor ? true : false}
				on:next={() => {
					send('NEXT');
				}}
			/>

			<Events {events} />

			{#if !$session.isAuthenticated}
				<CTA />
			{:else if !$session.thatProfile?.isMember}
				<CtaMembership />
			{/if}

			<BlogLatest posts={blogPosts} />
			<NewMembers {members} />
			<Newsletter />
		</div>
	{/if}
</Layout>
