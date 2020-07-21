<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';

  import { ActionHeader } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
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
    console.log({ values });

    const newSession = {
      status: 'ACCEPTED',
      ...values,
    };

    // const { id } = await create(newSession);

    setSubmitting(false);
    resetForm();
    navigateTo(`/sessions`, { replace: true });
  }
</script>

<svelte:head>
  <title>Create a New Member Profile * THAT.us</title>
</svelte:head>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Let's create THAT profile." />
  </div>

  <div slot="body">
    <NewMemberForm {handleSubmit} />
  </div>

  <div slot="footer"></div>

</StackedLayout>
