<script>
  import { login } from '../../../../utilities/security';
  import { Highlight as HighlightButton } from '../../../../elements/buttons';
</script>

<div class="bg-thatBlue-800 text-white">
  <div
    class="max-w-5xl mx-auto py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8"
  >
    <h2 class="text-5xl font-extrabold sm:text-4xl">
      <span class="block">Signup today.</span>
      <span class="block">Join the daily conversation for FREE.</span>
    </h2>
    <div class="max-w-2xl mx-auto text-center">
      <p class="mt-4 text-lg leading-6">
        All you need is a login and profile to get started. Activities happen
        daily and every day is a new oportunity to learn something.
      </p>
    </div>

    <div class="mt-8 w-full">
      <HighlightButton on:click="{() => login('/my/settings/profile', true)}">
        Create An Account
      </HighlightButton>
    </div>
  </div>
</div>
