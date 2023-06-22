<script>
	export let data;

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
		UpNext,
		BlogLatest,
		ThatActiveEvents
	} from './_root/components';

	import createMachine from './_root/machines/upNext';

	let { members, events, thatActiveEvents, stats, activitiesUpNext, blogPosts, user } = data;

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

		{#if !user.isAuthenticated}
			<CTA />
		{:else if !user.profile?.isMember}
			<CtaMembership />
		{/if}

		<BlogLatest posts={blogPosts} />
		<Newsletter />
		<NewMembers {members} />
	</div>
</Layout>
