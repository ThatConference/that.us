<script>
  import { getClient } from '@urql/svelte';

  import SharedProfileForm from './_SharedProfileForm.svelte';

  import meQueryApi from '../../../../dataSources/api.that.tech/me/queries';
  import meMutationsApi from '../../../../dataSources/api.that.tech/me/mutations';
  import metaTagsStore from '../../../../store/metaTags';

  const { queryMeSharedProfile } = meQueryApi(getClient());
  const { updateSharedProfile } = meMutationsApi(getClient());

  async function handleUpdate({
    detail: { values, setSubmitting, resetForm },
  }) {
    setSubmitting(true);

    await updateSharedProfile(values);

    setSubmitting(false);
  }

  metaTagsStore.set({
    title: 'Your Shared Profile - THAT',
    description: 'Create or update your THAT profile.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/profiles/shared`,
    },
  });
</script>

{#await queryMeSharedProfile() then sharedProfile}
  <SharedProfileForm
    handleSubmit="{handleUpdate}"
    sharedProfile="{sharedProfile}" />
{/await}
