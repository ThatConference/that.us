<script>
  export let stateMachine;

  import { useService } from 'xstate-svelte';
  import { isEmpty } from 'lodash';
  import { navigateTo, Link } from 'yrv';

  import StepComplete from '../../../elements/svgs/StepComplete.svelte';
  import Step from '../../../elements/svgs/Step.svelte';

  import { debug } from '../../../config';
  import {
    isAuthenticated,
    token,
    thatProfile,
    login,
  } from '../../../utilities/security';

  const { state, send, service } = useService(stateMachine, {
    devTools: debug.xstate,
  });

  let stepOneComplete = false;
  let stepTwoComplete = false;
  let stepThreeComplete = false;
  let stepFourComplete = false;

  service.onTransition(eventState => {
    if (eventState.matches('authenticated')) {
      stepOneComplete = true;
    }

    if (eventState.matches('authenticated.profileCompleted')) {
      stepTwoComplete = true;
    }
  });

  $: if (!isEmpty($thatProfile)) {
    send('PROFILE_COMPLETED', { status: true });
  } else {
    send('PROFILE_COMPLETED', { status: false });
  }

  $: if ($isAuthenticated && $token) {
    send('AUTHENTICATED', { status: true });
  } else {
    send('AUTHENTICATED', { status: false });
  }
</script>

<nav aria-label="Progress">
  <ol
    class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
  >
    <li class="relative md:flex-1 md:flex">
      {#if stepOneComplete}
        <StepComplete stepName="Login" />
      {:else}
        <Step
          step="1"
          isActive="{$state.matches('pendingLogin')}"
          stepName="Login"
          on:click="{() => login('/orders/summary')}"
        />
      {/if}

      <div
        class="hidden md:block absolute top-0 right-0 h-full w-5"
        aria-hidden="true"
      >
        <svg
          class="h-full w-full text-gray-300"
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </li>

    <li class="relative md:flex">
      {#if stepTwoComplete}
        <StepComplete stepName="Profile Completed" />
      {:else}
        <Step
          step="2"
          isActive="{$state.matches('authenticated.pendingProfile')}"
          stepName="Profile Completed"
          on:click="{() => navigateTo('/my/profile', { replace: true })}"
        />
      {/if}

      <div
        class="hidden md:block absolute top-0 right-0 h-full w-5"
        aria-hidden="true"
      >
        <svg
          class="h-full w-full text-gray-300"
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </li>

    <li class="relative md:flex">
      {#if stepThreeComplete}
        <StepComplete stepName="Verify Order" />
      {:else}
        <Step
          step="3"
          isActive="{$state.matches('authenticated.profileCompleted.pendingVerification')}"
          stepName="Verify Order"
          on:click="{() => navigateTo('/orders/summary', { replace: true })}"
        />
      {/if}

      <div
        class="hidden md:block absolute top-0 right-0 h-full w-5"
        aria-hidden="true"
      >
        <svg
          class="h-full w-full text-gray-300"
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </li>

    <li class="relative md:flex">
      <Step step="4" isActive="{false}" stepName="Complete Purchase" href="/" />
    </li>
  </ol>
</nav>

<div class="px-4 py-5 sm:p-6">
  {#if $state.matches('pendingLogin')}
    <h3 class="text-lg leading-6 font-medium text-gray-900">Please Login</h3>
    <div class="mt-2 max-w-xl text-sm text-gray-500">
      <p>
        Your purchase is attached to the user profile who is logged in. To get
        started please login, and/or create an new account.
      </p>
    </div>
    <div class="mt-3 text-sm">
      <Link
        on:click="{() => login('/orders/summary')}"
        class="font-medium text-thatOrange-400 hover:text-thatOrange-500"
      >
        Login
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  {:else if $state.matches('authenticated.pendingProfile')}
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Full Profile Incomplete
    </h3>
    <div class="mt-2 max-w-xl text-sm text-gray-500">
      <p>
        Your purchase is attached to the user profile. In order to proceed you
        need to finish creating your user profile.
      </p>
    </div>
    <div class="mt-3 text-sm">
      <Link
        href="/my/profile"
        class="font-medium text-thatOrange-400 hover:text-thatOrange-500"
      >
        Complete Your Profile
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  {:else if $state.matches('authenticated.profileCompleted')}
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Finalize and Complete
    </h3>
    <div class="mt-2 max-w-xl text-sm text-gray-500">
      <p>
        To fully complete this purchase, upon continue we will redirect your
        browser to https://checkout.stripe.com. This is our credit card
        processor, Stripe. It's here where you will enter your payment details,
        and finalize this order. Once completed you will be redirected back to
        THAT.us.
      </p>
    </div>
  {/if}
</div>
