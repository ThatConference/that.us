<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import { navigateTo } from 'yrv';
  import _ from 'lodash';

  import { ActionHeader } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import ClaimTicketForm from '../../components/my/ClaimTicketForm.svelte';

  import memberApi from '../../dataSources/api.that.tech/members.js';
  import { tagEvent } from '../../utilities/gtag';

  import {
    isAuthenticated,
    user,
    thatProfile,
  } from '../../utilities/security.js';

  const { claimTicket } = memberApi(getClient());

  console.log({ $thatProfile });

  async function handleClaimTicket({
    detail: { values, setSubmitting, resetForm },
  }) {
    const { ticketReference } = values;
    const updateResults = await claimTicket(ticketReference);

    console.log({ updateResults });

    // thatProfile.set(updateResults);
    tagEvent('claim_badge', 'account', $user.sub);

    setSubmitting(false);
    resetForm();

    //todo... need to figure out how to refresh the profile.
    // navigateTo(`/sessions`, { replace: true });
  }
</script>

<svelte:head>
  <title>Merit Badges * THAT.us</title>
</svelte:head>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Merit Badges" />
  </div>

  <div slot="body">
    <ClaimTicketForm handleSubmit="{handleClaimTicket}" />
  </div>

  <div slot="footer">

    {#if $thatProfile}
      {#each $thatProfile.earnedMeritBadges as badge (badge.id)}
        <div>
          <img class="h-56 w-56" src="{badge.image}" alt="{badge.name}" />
        </div>
      {/each}
    {/if}

  </div>

</StackedLayout>
