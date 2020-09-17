<script>
  export let router;
  import { getContext } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  // ui support
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton, ModalError } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import SessionForm from '../../components/sessions/SessionForm.svelte';

  // utilities
  import metaTagsStore from '../../store/metaTags';
  import { tagEvent } from '../../utilities/gtag';
  import logEvent from '../../utilities/eventTrack';
  import { user } from '../../utilities/security.js';
  import { format } from './formatRequest';

  // data
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';

  const { sessionId } = router.params;

  const { update, getById } = sessionsApi(getClient());
  const sessionDetails = getById(sessionId);

  async function handleWithdraw(e) {
    await update(sessionId, {
      status: 'CANCELLED',
    });

    tagEvent('session_withdraw', 'session', $user.sub);
    logEvent('session_withdraw');

    navigateTo(`/my/submissions`, { replace: true });
  }

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    const updatedSession = format(values);
    await update(sessionId, updatedSession);

    tagEvent('session_update', 'session', $user.sub);
    logEvent('session_updated');

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions/${sessionId}?edit=true&isUpdated=true`, {
      replace: true,
    });
  }

  metaTagsStore.set({
    title: 'Edit Submission - THAT',
    description: 'Edit your submission.',
    openGraph: {
      type: 'website',
      url: `https://that.us/sessions/edit`,
    },
  });
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Update your Submission">
      <LinkButton href="/sessions" text="Return to THAT Board" />
    </ActionHeader>
  </div>

  <div slot="body">
    {#await sessionDetails}
      <CardLoader />
    {:then session}
      {#if session}
        <SessionForm
          handleSubmit="{handleSubmit}"
          handleWithdraw="{handleWithdraw}"
          initialValues="{session}"
        />
      {:else}
        <ModalError
          title="No Session Found"
          text="I'm sorry we weren't able to find the session you tried to edit."
          action="{{ title: 'My Submissions', href: '/my/submissions' }}"
        />
      {/if}
    {/await}
  </div>
</StackedLayout>
