<script>
	import { page } from '$app/stores';
	import { getClient } from '@urql/svelte';
	import { goto } from '$app/navigation';
	import Typewriter from 'svelte-typewriter';
	import Icon from 'svelte-awesome';
	import { plus } from 'svelte-awesome/icons';

	import seoMetaTags from '$utils/seo/metaTags';
	import logEvent from '$utils/eventTrack';

	import { ActionHeader, ModalError } from '$elements';
	import StackedLayout from '$elements/layouts/StackedLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import CardLoader from '$components/CardLoader.svelte';

	import sessionsMutationsApi from '$dataSources/api.that.tech/sessions/mutations';
	import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

	import { formatUpdate } from './_lib/formatRequest';
	import ActivityForm from './_components/form/ActivityForm.svelte';

	const { activityId } = $page.params;
	const { updateSession } = sessionsMutationsApi(getClient());
	const { queryMySessionById } = sessionsQueryApi(getClient());

	const metaTags = seoMetaTags({
		title: 'Edit Activity - THAT',
		description: 'Edit your submission.',
		openGraph: {
			type: 'website',
			url: `https://that.us/activity/edit`
		}
	});

	let activityDetails;

	async function querySession(sessionId) {
		return queryMySessionById(sessionId).then((sessionRetrieved) => {
			activityDetails = sessionRetrieved;
			return sessionRetrieved;
		});
	}

	async function handleWithdraw() {
		const status = activityDetails.type === 'OPEN_SPACE' ? 'CANCELLED' : 'WITHDREW';

		await updateSession(activityId, activityDetails.type, {
			status
		});

		logEvent('activity_withdraw');

		goto(`/my/submissions`, { replace: true });
	}

	async function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
		const { activity, type } = formatUpdate(values);

		await updateSession(activityId, type, activity);

		logEvent('activity_updated');

		setSubmitting(false);
		resetForm();

		if (activity.status === 'ACCEPTED') {
			goto(`/activities/${activityId}?edit=true&isUpdated=true`);
		} else {
			goto(`/my/submissions`);
		}
	}
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
		<ActionHeader>
			<div class="flex space-x-2" slot="title">
				<span>Create a new</span>
				<div class="italic text-that-orange">
					<Typewriter loop cursor="white" interval={[50, 60, 80]}>
						<span>Room.</span>
						<span>Presentation.</span>
						<span>Open Space.</span>
						<span>Code Review.</span>
						<span>Panel Discussion.</span>
						<span>Office Hours.</span>
						<span>Chat.</span>
						<span>Q&A.</span>
						<span>AMA.</span>
						<span>you decide.</span>
					</Typewriter>
				</div>
			</div>
		</ActionHeader>
	</div>

	<div slot="body">
		<div
			class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
		>
			<div class="flex items-center space-x-5">
				<div class="flex-shrink-0">
					<div class="relative text-that-blue">
						<Icon data={plus} class="rounded-full w-16 h-16" />
					</div>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-gray-900">Edit Activity</h1>
					<p class="text-sm font-medium text-gray-500">
						Below is a short set of questions to best schedule a new activity.
					</p>
				</div>
			</div>
			<div
				class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
			>
				<a
					href="/my/submissions"
					type="button"
					class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
				>
					View Your Past Submissions
				</a>
			</div>
		</div>

		{#await querySession(activityId)}
			<CardLoader />
		{:then activity}
			{#if activity}
				<div class="mt-8 sm:px-6 max-w-3xl lg:max-w-7xl mx-auto">
					<ActivityForm
						{handleSubmit}
						{handleWithdraw}
						initialData={activity}
						isBackdoor={false}
						isEdit={true}
					/>
				</div>
			{:else}
				<ModalError
					title="No Activity Found"
					text="I'm sorry we weren't able to find the activity you tried to edit."
					action={{ title: 'My Submissions', href: '/my/submissions' }}
				/>
			{/if}
		{/await}
	</div>
</StackedLayout>
