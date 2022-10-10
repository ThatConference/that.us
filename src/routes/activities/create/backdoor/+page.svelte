<script>
	export let data;

	import { goto } from '$app/navigation';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { tagEvent } from '$utils/tagEvent';
	import sessionsApi from '$dataSources/api.that.tech/sessions/mutations';

	import ActivityForm from '../../_components/form/ActivityForm.svelte';
	import { formatCreate } from '../../_lib/formatRequest';

	let { events, activeEvents, isBackdoor, eventId } = data;
	const { createSession } = sessionsApi();

	const metaTags = ((title = `Create a new activitiy for THAT or THAT Conference.`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create a New [Activity, Code Review, Open Space, Chat], you get the idea.',
			openGraph: {
				type: 'website',
				url: `https://that.us/activities/create/`
			}
		})
	}))();

	async function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
		setSubmitting(true);

		const { eventId } = values;
		const { activity, type } = formatCreate(values);

		await createSession(eventId, type, activity);

		tagEvent('created', 'activities');

		resetForm();
		setSubmitting(false);
		goto('/my/submissions/');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ActivityForm {handleSubmit} {activeEvents} {events} {isBackdoor} {eventId} isEdit={false} />
