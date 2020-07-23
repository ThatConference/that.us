<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';
  import _ from 'lodash';

  import { ActionHeader } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import ProfileForm from '../../components/my/ProfileForm.svelte';

  import memberApi from '../../dataSources/api.that.tech/members.js';

  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../utilities/security.js';

  const { createProfile, updateProfile, uploadImage } = memberApi(getClient());

  let isNewProfile;
  let currentProfile;

  $: if ($user || $thatProfile) {
    if (!_.isNil($thatProfile) && !_.isEmpty($thatProfile)) {
      currentProfile = $thatProfile;
      isNewProfile = false;
    } else {
      currentProfile = {
        firstName: $user.given_name,
        lastName: $user.family_name,
        profileSlug: $user.nickname,
        email: $user.email,
      };
      isNewProfile = true;
    }
  }

  async function handleNew({ detail: { values, setSubmitting, resetForm } }) {
    const updateResults = await createProfile({ ...values, profileLinks: [] });

    thatProfile.set(updateResults);

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions`, { replace: true });
  }

  async function handleUpdate({
    detail: { values, setSubmitting, resetForm },
  }) {
    let updatedProfile = {
      ...values,
      profileLinks: [],
    };

    // we don't allow the following to get updated
    delete updatedProfile.profileSlug;
    delete updatedProfile.isOver13;
    delete updatedProfile.acceptedCodeOfConduct;
    delete updatedProfile.acceptedTermsOfService;

    const updateResults = await updateProfile(updatedProfile);
    thatProfile.set(updateResults);

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions`, { replace: true });
  }
</script>

<svelte:head>
  <title>Create a New Member Profile * THAT.us</title>
</svelte:head>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Let's create THAT profile." />
  </div>

  <div slot="body">
    <ProfileForm
      handleSubmit="{isNewProfile ? handleNew : handleUpdate}"
      profile="{currentProfile}"
      {isNewProfile}
    />
  </div>

  <div slot="footer"></div>

</StackedLayout>
