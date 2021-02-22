<script>
  import { createEventDispatcher } from 'svelte';

  import { Standard as StandardButton } from '../../../elements/buttons';
  import { Standard as StandardLink } from '../../../elements/links';
  import { CTA } from '../../../elements';

  const dispatch = createEventDispatcher();
</script>

<CTA>
  <h2
    class="text-3xl leading-9 font-extrabold tracking-tight text-thatBlue-800 sm:text-4xl sm:leading-10">
    You don't want to miss this opportunity!
    <br />
    <span class="text-that-orange">Get your ticket today!</span>
  </h2>

  <span slot="actionPrimary">
    <StandardButton on:click="{() => dispatch('purchase-event-ticket')}">
      Purchase Now
    </StandardButton>

    <StandardLink href="/membership/pricing">Pricing Details</StandardLink>
  </span>
</CTA>
