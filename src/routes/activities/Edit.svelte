<script>
  export let router;
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  // ui support
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton, ModalError } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import ActivityForm from '../../components/activities/ActivityForm.svelte';

  // utilities
  import metaTagsStore from '../../store/metaTags';
  import { tagEvent } from '../../utilities/gtag';
  import logEvent from '../../utilities/eventTrack';
  import { user } from '../../utilities/security.js';
  import { format } from './formatRequest';

  // data
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';

  const { activityId } = router.params;

  const { update, getById } = sessionsApi(getClient());
  const activityDetails = getById(activityId);

  async function handleWithdraw(e) {
    await update(activityId, {
      status: 'CANCELLED',
    });

    tagEvent('activity_withdraw', 'activity', $user.sub);
    logEvent('activity_withdraw');

    navigateTo(`/my/submissions`, { replace: true });
  }

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    const updatedActivity = format(values);
    await update(activityId, updatedActivity);

    tagEvent('activity_update', 'activity', $user.sub);
    logEvent('activity_updated');

    setSubmitting(false);
    resetForm();
    navigateTo(`/activities/${activityId}?edit=true&isUpdated=true`, {
      replace: true,
    });
  }

  metaTagsStore.set({
    title: 'Edit Activity - THAT',
    description: 'Edit your submission.',
    openGraph: {
      type: 'website',
      url: `https://that.us/activity/edit`,
    },
  });
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Update your Submission">
      <LinkButton href="/activities" text="Return to Activities" />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await activityDetails}
      <CardLoader />
    {:then activity}
      {#if activity}
        <ActivityForm
          handleSubmit="{handleSubmit}"
          handleWithdraw="{handleWithdraw}"
          initialValues="{activity}"
        />
      {:else}
        <ModalError
          title="No Activity Found"
          text="I'm sorry we weren't able to find the activity you tried to edit."
          action="{{ title: 'My Submissions', href: '/my/submissions' }}"
        />
      {/if}
    {/await}
  </div>
</StackedLayout>
