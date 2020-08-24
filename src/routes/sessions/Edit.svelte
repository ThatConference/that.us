<script>
  export let router;
  import { getContext } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  import Meta from '../../components/seo/Meta.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton, ModalError } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import SessionForm from '../../components/sessions/SessionForm.svelte';
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';
  import { tagEvent } from '../../utilities/gtag';

  import { user } from '../../utilities/security.js';
  import { format } from './formatRequest';

  const { sessionId } = router.params;

  const { update, getById } = sessionsApi(getClient());
  const sessionDetails = getById(sessionId);

  async function handleWithdraw(e) {
    await update(sessionId, {
      status: 'CANCELLED',
    });

    tagEvent('session_withdraw', 'session', $user.sub);

    navigateTo(`/my/submissions`, { replace: true });
  }

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    const updatedSession = format(values);
    await update(sessionId, updatedSession);

    tagEvent('session_update', 'session', $user.sub);

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions/${sessionId}?edit=true&isUpdated=true`, {
      replace: true,
    });
  }
</script>

<Meta
  title="Edit Submission - THAT"
  description="todo"
  openGraph="{{ title: 'Edit Submission * THAT', description: 'todo', type: 'website', url: `https://that.us/sessions/edit` }}"
/>

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
          {handleSubmit}
          {handleWithdraw}
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
