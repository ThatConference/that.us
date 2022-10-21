<script>
	export let data;

	import { goto } from '$app/navigation';

	import { tagEvent } from '$utils/tagEvent';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import memberApi from '$dataSources/api.that.tech/members/mutations';
	import ProfileForm from '../_components/profileForm.svelte';

	let { currentProfile, isNewProfile } = data;
	const { createProfile, updateProfile } = memberApi();

	/* todo
		before the last kit upgrade we had update the svelte session store. now there isn't a session store.
		this feels broken expecially on new profiles.
	*/

	async function handleNew({ detail: { values, setSubmitting, resetForm } }) {
		setSubmitting(true);
		await createProfile({ profileLinks: [], ...values });

		tagEvent('created', 'profile');

		setSubmitting(false);
		resetForm();
		goto(`/`);
	}

	async function handleUpdate({ detail: { values, setSubmitting, resetForm } }) {
		let updatedProfile = {
			profileLinks: [],
			...values
		};

		// we don't allow the following to get updated
		delete updatedProfile.profileSlug;
		delete updatedProfile.isOver13;
		delete updatedProfile.acceptedCodeOfConduct;
		delete updatedProfile.acceptedTermsOfService;

		setSubmitting(true);
		await updateProfile(updatedProfile);

		tagEvent('update', 'profile');
		setSubmitting(false);
		resetForm();

		goto(`/`);
	}

	const metaTags = ((title = 'My Profile - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create or update your THAT profile.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/profiles/primary/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ProfileForm
	handleSubmit={isNewProfile ? handleNew : handleUpdate}
	profile={currentProfile}
	{isNewProfile} />
