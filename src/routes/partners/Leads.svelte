<script>
  import { router, navigateTo } from 'yrv';
  import { getClient } from '@urql/svelte';
  import { Circle3 } from 'svelte-loading-spinners';

  import { Shell } from '../../elements/buttons';
  import NumPad from '../../components/numberPad/Panel.svelte';

  import leadsMutationApi from '../../dataSources/api.that.tech/partner/leads/mutations';

  const { addPin } = leadsMutationApi(getClient());

  const { eventId } = $router.params;

  let pinNumber = '';
  let partnerNotes;
  let waiting = false;

  let contactExchangeError = false;
  let comtactExchangeErrorMessage;

  async function handleContactExchange() {
    waiting = true;
    woopra.track('event_contact_exchanged');

    const { result, message } = await addPin(eventId, pinNumber, partnerNotes);

    waiting = false;

    if (result) {
      pinNumber = '';
    } else {
      contactExchangeError = true;
      comtactExchangeErrorMessage = message;
    }
  }

  function tryAgain() {
    contactExchangeError = false;
    comtactExchangeErrorMessage = undefined;
  }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h1 class="mt-6 text-xl leading-6 font-bold text-thatBlue-800">
    THAT Contact Exchange
  </h1>
  <div class="block absolute top-0 right-0 pt-4 pr-4">
    <button
      type="button"
      class="p-2 border-2 border-gray-200 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thatBlue-500"
      on:click="{() => navigateTo('/')}">
      <span class="sr-only">Close</span>
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <div class="mt-4 max-w-sm mx-auto">
    {#if waiting}
      <div class="relative my-6 flex flex-col items-center space-y-6">
        <Circle3
          size="{'60'}"
          unit="{'px'}"
          ballTopLeft="#f74646"
          ballTopRight="#ff834d"
          ballBottomLeft="#26529A"
          ballBottomRight="#555555" />

        <div class="mt-2">
          <p class="text-md leading-5 text-gray-500">
            Invoking api and adding contact.
          </p>
        </div>
      </div>
    {:else if contactExchangeError}
      <div class="relative my-6 flex flex-col space-y-6">
        <div class="mt-2">
          <p class="text-md leading-5 text-gray-500">
            {comtactExchangeErrorMessage}
          </p>
        </div>

        <div class="flex">
          <Shell>
            <button
              class="w-full py-4 text-sm leading-5 font-medium"
              on:click="{() => tryAgain()}">
              <span class="text-lg">Retry</span>
            </button>
          </Shell>
        </div>
      </div>
    {:else}
      <div class="w-full flex flex-col space-y-4">
        <div class="p-8 bg-gray-50 bg-opacity-50 shadow-md border rounded-xl">
          <NumPad
            on:digit="{event => {
              pinNumber = pinNumber.concat(event.detail);
            }}"
            on:backspace="{event => {
              pinNumber = pinNumber.slice(0, -1);
            }}" />
        </div>

        <div
          class="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-thatBlue-800 focus-within:border-thatBlue-800">
          <input
            autofocus
            type="text"
            name="pinNumber"
            bind:value="{pinNumber}"
            class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
            placeholder="E.g. 1234" />
        </div>

        <div class="flex">
          <Shell>
            <button
              class="w-full py-4 text-sm leading-5 font-medium"
              on:click="{() => handleContactExchange()}">
              <span class="text-lg">Connect</span>
            </button>
          </Shell>
        </div>

        <div>
          <textarea
            name="notes"
            type="textarea"
            rows="10"
            multiline="{true}"
            bind:value="{partnerNotes}"
            class="border border-gray-300 rounded-md  form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
            placeholder="E.g. Jane would be a great fit for our company."
          ></textarea>
        </div>
      </div>
    {/if}
  </div>
</div>
