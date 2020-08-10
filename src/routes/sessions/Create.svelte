<script>
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';
  import Typewriter from 'svelte-typewriter';

  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader, LinkButton } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import SessionForm from '../../components/sessions/SessionForm.svelte';
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';
  import { tagEvent } from '../../utilities/gtag';

  import { format } from './formatRequest';

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

    const newSession = format(values);
    const { id } = await create(newSession);

    tagEvent('session_created', 'session', $user.sub);

    setSubmitting(false);
    navigateTo(`/sessions/${id}?edit=true&isNew=true`, { replace: true });
  }
</script>

<svelte:head>
  <title>Create a New Session 📄 THAT.us</title>
</svelte:head>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader>
      <LinkButton href="/sessions" text="Return to Schedule" />

      <div class="flex space-x-2" slot="title">
        <span>Create a new</span>
        <div class="italic">
          <Typewriter mode="loop" cursor="white" interval="{[50, 60, 80]}">
            <span>Presentation.</span>
            <span>Open Space.</span>
            <span>Code Review.</span>
            <span>Panel Discussion.</span>
            <span>Chat.</span>
            <span>Q&A.</span>
            <span>AMA.</span>
            <span>you decide.</span>
          </Typewriter>
        </div>
      </div>
    </ActionHeader>
  </div>

  <div slot="body">
    <SessionForm {handleSubmit} />
  </div>

</StackedLayout>
