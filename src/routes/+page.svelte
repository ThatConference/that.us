<script>
	export let data;

	import { page } from '$app/stores';
	import { useMachine } from '@xstate/svelte';

	import { debug } from '$utils/config.public';
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

	let { members, events, thatActiveEvents, stats, activitiesUpNext, blogPosts } = data;
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
	{#if $page.data.profile?.isMember}
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

			{#if !$page.data.user.isAuthenticated}
				<CTA />
			{:else if !$page.data.user.profile?.isMember}
				<CtaMembership />
			{/if}

			<BlogLatest posts={blogPosts} />
			<NewMembers {members} />
			<Newsletter />
		</div>
	{/if}
</Layout>
