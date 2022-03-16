<script context="module">
	import membersApi from '$dataSources/api.that.tech/members/queries';
	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import statsApi from '$dataSources/api.that.tech/stats/queries';
	import sessionsApi from '$dataSources/api.that.tech/sessions';
	import communityQueryApi from '$dataSources/api.that.tech/community/queries';

	//blog
	import { getPosts } from '$blog/getPosts';

	export async function load({ fetch }) {
		const { queryActiveThatEvents } = communityQueryApi(fetch);
		const { queryMembers, queryBlogAuthorBySlug } = membersApi(fetch);
		const { queryEventsByCommunity } = eventsApi(fetch);
		const { queryCommunityStats } = statsApi(fetch);
		const { querySessionsByDate } = sessionsApi(fetch);

		const rawPosts = getPosts({ limit: 6 });

		// todo - some of these graph calls could be combined.
		// todo - we could pick off the cfp from the event already queried.
		// todo - "up next event" should come from somewhere.

		const [members, events, stats, thatActiveEvents, activitiesUpNext, blogPosts] =
			await Promise.all([
				queryMembers(15),
				queryEventsByCommunity(),
				queryCommunityStats(),
				queryActiveThatEvents(),
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

		const filteredEvents = thatActiveEvents.filter((x) => x.type === 'HYBRID_MULTI_DAY');

		return {
			props: {
				members: members.members,
				events,
				stats,
				thatActiveEvents: filteredEvents,
				activitiesUpNext,
				blogPosts
			}
		};
	}
</script>

<script>
	export let members;
	export let events;
	export let thatActiveEvents;
	export let stats;

	export let activitiesUpNext;
	export let blogPosts;

	import { session } from '$app/stores';
	import { useMachine } from 'xstate-svelte';

	import { debug } from '$utils/config';
	import seoMetaTags from '$utils/seo/metaTags';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import Seo from '$components/Seo.svelte';

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
		BlogLatest,
		ThatActiveEvents
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
		<div>
			<WelcomeBack />
		</div>

		<div>
			<UpNext
				items={$state.context.items}
				hasMore={$state.context.cursor ? true : false}
				on:next={() => {
					send('NEXT');
				}} />
		</div>

		<div>
			<Events {events} />
		</div>

		<div>
			<Stats {stats} />
			<BlogLatest posts={blogPosts} />
			<NewMembers {members} />
			<Newsletter />
		</div>
	{:else}
		<div>
			<Hero />
			<ThatActiveEvents events={thatActiveEvents} />
		</div>

		<div>
			<Testimonials />
			<Stats {stats} />
		</div>

		<div>
			<UpNext
				items={$state.context.items}
				hasMore={$state.context.cursor ? true : false}
				on:next={() => {
					send('NEXT');
				}} />

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
