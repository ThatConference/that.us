<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import { Error } from '$elements/modals';
	import { ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';

	const { activityId } = $page.params;

	const metaTags = seoMetaTags({
		title: 'Access Denied - THAT',
		description: 'Your access was denied to join this activity.',
		openGraph: {
			type: 'website',
			url: `https://that.us/join/access-denied`
		},
		noindex: true,
		nofollow: true
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<StackedLayout bodyBackgroundColor="bg-gray-100">
	<div slot="header">
		<Nav />
		<ActionHeader title="Access Denied" />
	</div>

	<div slot="body">
		<div class="h-24">
			<Error
				title="Access Denied"
				text="An event ticket or active membership is required to join this Activity."
				action={{
					title: 'View Activities',
					href: '/activities'
				}}
				returnTo={{
					title: 'Retry Joining',
					href: `/join/${activityId}`
				}}
			/>
		</div>
	</div>
</StackedLayout>
