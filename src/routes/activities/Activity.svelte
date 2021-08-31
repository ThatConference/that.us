<script>
	import { page } from '$app/stores';
	import { FacebookLoader } from 'svelte-content-loader';

	import seoMetaTags from '$utils/seo/metaTags';
	import { ModalError, ActionHeader } from '$elements';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import ActivityDetails from '$components/activities/ActivityDetails.svelte';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';

	import sessionsApi from '$dataSources/api.that.tech/sessions';
	import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

	const { id } = $page.params;
	const { getById } = sessionsApi();
	const { querySessionDropDownValues } = sessionsQueryApi();

	const metaTags = seoMetaTags({
		title: 'Activity - THAT',
		description: '',
		openGraph: {
			type: 'website',
			url: `https://that.us/activities/${id}`
		}
	});

	async function getSessionData(sessionId) {
		const session = getById(sessionId);
		const sessionLookups = getSessionLookupValues();

		return Promise.all([session, sessionLookups]);
	}

	function getSessionLookupValues() {
		return querySessionDropDownValues();
	}
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
		<ActionHeader title="Activity Spotlight" />
	</div>
	<div slot="body">
		{#await getSessionData(id)}
			<div class="flex justify-center sm:justify-start">
				<FacebookLoader uniqueKey="loading" />
			</div>
		{:then [activity, sessionLookups]}
			<ActivityDetails {activity} sessionLocation={activity.location} {sessionLookups} />
		{:catch error}
			<ModalError
				title="No Activitie Found"
				text="I'm sorry we weren't able to find the activity you requested."
				action={{ title: 'Return to Activities', href: '/activities' }}
			/>
		{/await}
	</div>
</StackedLayout>
