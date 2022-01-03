<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';

	import { Error } from '$elements/modals';
	import { ActionHeader } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	let returnTo = {
		title: 'Home',
		href: '/'
	};

	if (page.query.has('id')) {
		returnTo = {
			title: 'Try again',
			href: `/join/${page.query.get('id')}`
		};
	}

	const metaTags = ((title = 'Your access to join this activity was denied') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your access was denied to join this activity.',
			openGraph: {
				type: 'website',
				url: `https://that.us/join/access-denied`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

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
				{returnTo}
			/>
		</div>
	</div>
</StackedLayout>
