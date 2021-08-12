<script>
  import { getClient } from '@urql/svelte';
  import { isEmpty } from 'lodash';

  import { Warning } from '../../../../elements/svgs';
  import { thatProfile } from '../../../../utilities/security';
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

{#if !isEmpty($thatProfile)}
  {#await queryMeSharedProfile() then sharedProfile}
    <SharedProfileForm
      handleSubmit="{handleUpdate}"
      sharedProfile="{sharedProfile}" />
  {/await}
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
