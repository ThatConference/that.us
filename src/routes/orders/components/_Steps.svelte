<script>
  import { useMachine } from 'xstate-svelte';
  import { isEmpty } from 'lodash';
  import { navigateTo } from 'yrv';

  import StepComplete from '../../../elements/svgs/StepComplete.svelte';
  import Step from '../../../elements/svgs/Step.svelte';

  import summaryMachine from '../machines/summary';
  import { debug } from '../../../config';
  import {
    isAuthenticated,
    token,
    thatProfile,
    login,
  } from '../../../utilities/security';

  const { state, send, service } = useMachine(summaryMachine(), {
    devTools: debug.xstate,
  });

  let stepOneComplete = false;
  let stepTwoComplete = false;
  let stepThreeComplete = false;
  let stepFourComplete = false;

  service.onTransition(state => {
    if (state.matches('authenticated')) {
      stepOneComplete = true;
    }

    if (state.matches('authenticated.profileCompleted')) {
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
