<script>
  export let memberSlug;

  import { Standard as StandardButton } from '../../elements/buttons';
  import { CTA } from '../../elements';
</script>

<CTA>
  <h2
    class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900
    sm:text-4xl sm:leading-10"
  >
    Don't miss an opportunity to collaborate together.
    <br />

    <span class="text-that-orange">Follow @{memberSlug} Today</span>
  </h2>

  <span slot="actionPrimary">
    <StandardButton class="h-3/4" on:click>Follow @{memberSlug}</StandardButton>
  </span>
</CTA>
