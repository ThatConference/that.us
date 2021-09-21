<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import lodash from 'lodash';

	import logEvent from '$utils/eventTrack';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import memberApi from '$dataSources/api.that.tech/members/mutations';

	import ProfileForm from './_components/profileForm.svelte';

	const { isNil, isEmpty } = lodash;
	const { createProfile, updateProfile } = memberApi();

	let isNewProfile;
	let currentProfile;

	$: if ($session.user || $session.thatProfile) {
		if (!isNil($session.thatProfile) && !isEmpty($session.thatProfile)) {
			currentProfile = $session.thatProfile;
			isNewProfile = false;
		} else {
			currentProfile = {
				firstName: $session.user.given_name ? $session.user.given_name : '',
				lastName: $session.user.family_name ? $session.user.family_name : '',
				profileSlug: $session.user.nickname ? $session.user.nickname : '',
				email: $session.user.email ? $session.user.email : ''
			};
			isNewProfile = true;
		}
	}

	async function handleNew({ detail: { values, setSubmitting, resetForm } }) {
		const updateResults = await createProfile({ profileLinks: [], ...values });

		// todo how do we refresh the profile
		// thatProfile.set(updateResults);
		logEvent('profile_created');

		setSubmitting(false);
		resetForm();
		goto(`/activities`, { replace: true });
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

		const updateResults = await updateProfile(updatedProfile);

		logEvent('profile_update');

		// todo how do we refresh the profile
		// thatProfile.set(updateResults);

		setSubmitting(false);
		resetForm();
		goto(`/activities`, { replace: true });
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
	{isNewProfile}
/>
