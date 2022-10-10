<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ActionHeader } from '$elements';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import ActivityDetails from '$components/activities/ActivityDetails.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	let { activity } = data;

	const metaTags = ((imageId = activity.id, title = `${activity.title}.`) => ({
		title,
		tags: seoMetaTags({
			title,
			imageId,
			description: `${activity.shortDescription}`,
			openGraph: {
				url: `https://that.us/activities/${activity.id}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<StackedLayout>
	<div slot="header">
		<Nav />
		<ActionHeader title="Activity Spotlight" />
	</div>
	<div slot="body">
		<ActivityDetails {activity} sessionLocation={activity.location} />
	</div>
</StackedLayout>
