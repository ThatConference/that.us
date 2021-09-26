<script context="module">
	import lodash from 'lodash';
	import meApi from '$dataSources/api.that.tech/me';

	const { isNil, isEmpty } = lodash;

	export async function load({ fetch, session }) {
		const { queryMe } = meApi(fetch);
		const me = await queryMe();

		let isNewProfile, currentProfile;

		if (session.user || me) {
			if (!isNil(me) && !isEmpty(me)) {
				currentProfile = me;
				isNewProfile = false;
			} else {
				currentProfile = {
					firstName: session.user.given_name ? session.user.given_name : '',
					lastName: session.user.family_name ? session.user.family_name : '',
					profileSlug: session.user.nickname ? session.user.nickname : '',
					email: session.user.email ? session.user.email : ''
				};
				isNewProfile = true;
			}
		}

		return {
			props: {
				currentProfile,
				isNewProfile
			}
		};
	}
</script>

<script>
	export let isNewProfile;
	export let currentProfile;

	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import logEvent from '$utils/eventTrack';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import memberApi from '$dataSources/api.that.tech/members/mutations';
	import ProfileForm from './_components/profileForm.svelte';

	const { createProfile, updateProfile } = memberApi();

	function updateSession(profile) {
		session.update((s) => {
			return {
				...s,
				thatProfile: profile
			};
		});
	}

	async function handleNew({ detail: { values, setSubmitting, resetForm } }) {
		const updatedThatProfile = await createProfile({ profileLinks: [], ...values });

		updateSession(updatedThatProfile);

		logEvent('profile_created');

		setSubmitting(false);
		resetForm();
		goto(`/activities`);
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

		const updatedThatProfile = await updateProfile(updatedProfile);

		updateSession(updatedThatProfile);

		logEvent('profile_update');

		setSubmitting(false);
		resetForm();
		goto(`/activities`);
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
