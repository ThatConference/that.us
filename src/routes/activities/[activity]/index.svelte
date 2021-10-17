<script context="module">
	import sessionsApi from '$dataSources/api.that.tech/sessions';
	import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

	export async function load({ page, fetch }) {
		const { getById } = sessionsApi(fetch);
		const { querySessionDropDownValues } = sessionsQueryApi(fetch);

		let activityId = page.params.activity;

		//todo need to figure out how to handle no sessions.. do we return an error, or just pop a message box

		let [activity, sessionLookups] = await Promise.all([
			getById(activityId),
			querySessionDropDownValues()
		]);

		return {
			props: {
				activity,
				sessionLookups
			}
		};
	}
</script>

<script>
	export let activity;
	export let sessionLookups;

	import seoMetaTags from '$utils/seo/metaTags';

	import Seo from '$components/Seo.svelte';
	import { ActionHeader } from '$elements';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import ActivityDetails from '$components/activities/ActivityDetails.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	const metaTags = ((
		image = `/activity/?id=${activity.id}`,
		title = `${activity.title} - THAT`
	) => ({
		title,
		tags: seoMetaTags({
			title,
			image,
			description: `${activity.shortDescription}`,
			openGraph: {
				url: `https://that.us/activity/${activity.id}`
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
		<ActivityDetails {activity} sessionLocation={activity.location} {sessionLookups} />
	</div>
</StackedLayout>
