<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  import { ActionHeader } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import NewMemberForm from '../../components/my/NewMemberForm.svelte';
  import memberApi from '../../dataSources/api.that.tech/members.js';

  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../utilities/security.js';

  const { create } = memberApi(getClient());

  async function handleSubmit({
    detail: { values, setSubmitting, resetForm },
  }) {
    const newSession = {
      status: 'ACCEPTED',
      ...values,
    };

    const { id } = await create(newSession);

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions`, { replace: true });
  }
</script>

<svelte:head>
  <title>Create a New Member Profile * THAT.us</title>
</svelte:head>

<div>
  <div class="bg-gray-800 pb-32">
    <Nav />
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <NewMemberForm {handleSubmit} />
      </div>
    </div>
  </main>
</div>
