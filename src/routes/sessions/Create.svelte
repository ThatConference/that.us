<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import SessionForm from '../../components/sessions/SessionForm.svelte';
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';
  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../utilities/security.js';

  const { create } = sessionsApi(getClient());

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    setSubmitting(true);
    const newSession = {
      status: 'ACCEPTED',
      ...values,
    };

    const { id } = await create(newSession);

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions/${id}?edit=true`, { replace: true });
  }
</script>

<svelte:head>
  <title>Create a New Session * THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Create A New Chat" />
  </div>

  <div slot="body">
    <SessionForm {handleSubmit} />
  </div>

</StackedLayout>
