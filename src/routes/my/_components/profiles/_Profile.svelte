<script>
	import { goto } from '$app/navigation';
	import { isNil, isEmpty } from 'lodash';
	import { getClient } from '@urql/svelte';

	import ProfileForm from './ProfileForm.svelte';

	import memberApi from '$dataSources/api.that.tech/members/mutations';
	import logEvent from '$utils/eventTrack';
	import { user, thatProfile } from '$utils/security.js';
	import metaTagsStore from '$stores/metaTags';

	const { createProfile, updateProfile } = memberApi(getClient());

	let isNewProfile;
	let currentProfile;

	$: if ($user || $thatProfile) {
		if (!isNil($thatProfile) && !isEmpty($thatProfile)) {
			currentProfile = $thatProfile;
			isNewProfile = false;
		} else {
			currentProfile = {
				firstName: $user.given_name ? $user.given_name : '',
				lastName: $user.family_name ? $user.family_name : '',
				profileSlug: $user.nickname ? $user.nickname : '',
				email: $user.email ? $user.email : ''
			};
			isNewProfile = true;
		}
	}

	async function handleNew({ detail: { values, setSubmitting, resetForm } }) {
		const updateResults = await createProfile({ profileLinks: [], ...values });

		thatProfile.set(updateResults);
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

		thatProfile.set(updateResults);

		setSubmitting(false);
		resetForm();
		goto(`/activities`, { replace: true });
	}

	metaTagsStore.set({
		title: 'Your Profile - THAT',
		description: 'Create or update your THAT profile.',
		nofollow: true,
		noindex: true,
		openGraph: {
			type: 'website',
			url: `https://that.us/my/profiles/primary`
		}
	});
</script>

<ProfileForm
	handleSubmit={isNewProfile ? handleNew : handleUpdate}
	profile={currentProfile}
	{isNewProfile}
/>
