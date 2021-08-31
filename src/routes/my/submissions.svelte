<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import submissionsApi from '$dataSources/api.that.tech/submissions';

	import { ActionHeader, ModalError, ModalWarning } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	import Nav from '$components/nav/interiorNav/Top.svelte';
	import Sponsor from '$components/SponsorSimple.svelte';
	import CardLoader from '$components/CardLoader.svelte';

	import SubmissionList from './_components/_SubmissionList.svelte';

	const metaTags = seoMetaTags({
		title: 'My Submissions - THAT',
		description: 'Your activities.',
		openGraph: {
			type: 'website',
			url: `https://that.us/my/submissions`
		},
		nofollow: true,
		noindex: true
	});

	const { queryMySubmissions } = submissionsApi();
	const query = queryMySubmissions();
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="My Submissions">
			<aButton href="/activities/create" text="Create a New ..." />
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
