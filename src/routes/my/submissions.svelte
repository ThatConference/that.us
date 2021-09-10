<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import submissionsApi from '$dataSources/api.that.tech/submissions';

	import { ActionHeader, ModalError, ModalWarning } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	import Seo from '$components/Seo.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import CardLoader from '$components/CardLoader.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import SubmissionList from './_components/_SubmissionList.svelte';

	const metaTags = ((title = 'My Submissions - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your activities.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/submissions`
			},
			nofollow: true,
			noindex: true
		})
	}))();

	const { queryMySubmissions } = submissionsApi();
	const query = queryMySubmissions();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="My Submissions">
			<HighlightLink href="/activities/create">Create Activity</HighlightLink>
		</ActionHeader>
	</div>

	<div slot="body">
		{#await query}
			<CardLoader />
		{:then activities}
			{#if activities.length > 0}
				<SubmissionList {activities} />
			{:else}
				<div class="p-12">
					<ModalWarning
						title="You have no activities submitted?"
						text="Why not? Submit something today!"
					/>
				</div>
			{/if}
		{:catch error}
			<ModalError
				title="KABOOM!"
				text="I'm sorry, bugs are features right? If I were you, I'd refresh the
        page right now."
				action={{ title: 'Return to Activities', href: '/activities' }}
			/>
		{/await}
	</div>

	<div slot="footer">
		<Sponsor />
	</div>
</StackedLayout>
