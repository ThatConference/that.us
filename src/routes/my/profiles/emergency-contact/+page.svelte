<script>
	export let data;

	import { page } from '$app/stores';
	import lodash from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Warning } from '$elements/svgs';

	import EmergencyContactForm from '../_components/emergencyContactForm.svelte';
	import membersMutationApi from '$dataSources/api.that.tech/members/mutations';

	let { emergencyContactInformation } = data;
	const { isEmpty } = lodash;
	const { updateEmergencyContact } = membersMutationApi();

	async function handleUpdate({ detail: { values, setSubmitting } }) {
		setSubmitting(true);

		await updateEmergencyContact(values);

		setSubmitting(false);
	}

	const metaTags = ((title = 'My Emergency Contact - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create or update your emergency contact information.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/profiles/emergency-contact/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if !isEmpty($page.data.user.profile)}
	<EmergencyContactForm handleSubmit={handleUpdate} {emergencyContactInformation} />
{:else}
	<div class="mt-8">
		<div class="flex items-center">
			<div class="mr-4">
				<Warning classes="h-12 w-12 text-red-500" />
			</div>

			<h2 class="prose-xl text-gray-500">
				Please complete your main profile before trying to create a shared one.
			</h2>
		</div>
	</div>
{/if}
