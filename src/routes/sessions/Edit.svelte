<script>
  export let router;
  import { getContext } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

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

<div>
  <div class="bg-gray-800 pb-32">
    <Nav />
    <ActionHeader title="Edit Chat">
      <LinkButton href="/sessions" text="Return to Schedule" />
    </ActionHeader>
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">

        {#await sessionDetails}
          <CardLoader />
        {:then session}
          <SessionForm {handleSubmit} initialValues="{session}" />
        {/await}

      </div>
    </div>
  </main>
</div>
