<script>
  export let router;
  import { getContext } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import CardLoader from '../../components/CardLoader.svelte';
  import SessionForm from '../../components/sessions/SessionForm.svelte';
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';

  const { sessionId } = router.params;

  const { update, getById } = sessionsApi(getClient());

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    const updatedSession = {
      status: 'ACCEPTED',
      ...values,
    };

    await update(sessionId, updatedSession);

    setSubmitting(false);
    resetForm();
    navigateTo('/sessions', { replace: true });
  }

  const sessionDetails = getById(sessionId);
</script>

<svelte:head>
  <title>Edit Session * THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Edit Chat">
      <LinkButton href="/sessions" text="Return to Schedule" />
    </ActionHeader>

  </div>

  <div slot="body">
    {#await sessionDetails}
      <CardLoader />
    {:then session}
      <SessionForm {handleSubmit} initialValues="{session}" />
    {/await}

  </div>

</StackedLayout>
