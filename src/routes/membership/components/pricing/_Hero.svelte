<script>
export let eventTicket;
export let membership;

import { navigateTo } from 'yrv';
import { getContext } from 'svelte';

import { login } from '../../../../utilities/security';

import { Check, Ban } from '../../../../elements/svgs';
import {
  Standard as StandardButton,
  Highlight as HighlightButton,
} from '../../../../elements/buttons';

const { send } = getContext('cart');

function handleAddMembershipClick(quantity = 1) {
  const isBulkPurchase = quantity > 1 ? true : false;
  send('ADD_ITEM', { ...membership, isBulkPurchase, quantity });
  navigateTo('/orders/summary');
}

function handleAddEventTicketClick(quantity = 1) {
  const isBulkPurchase = quantity > 1 ? true : false;
  send('ADD_ITEM', { ...eventTicket, isBulkPurchase, quantity });
  navigateTo('/orders/summary');
}
</script>

<div>
  <div class="bg-thatBlue-800 pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
    <div class="text-center">
      <h2
        class="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
        Pricing
      </h2>
      <p class="mt- text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
        You're not the product, we are.
      </p>
      <p
        class="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
        Our passion is people, communities and helping one another become better
        than they were yesterday.
      </p>
      <p
        class="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
        We could create a free platform, but then we have to monitize your data.
        To that we say, no thank you. Rather we're taking the approach of
        creating a monitization strategy of help us, help you.
      </p>
    </div>
  </div>

  <div class="pb-12 lg:pb-20">
    <div class="bg-gradient-to-b from-thatBlue-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="pt-20 relative lg:grid lg:grid-cols-7">
          <div
            class="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
            <div
              class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
              <div class="flex-1 flex flex-col">
                <div class="bg-white px-6 py-10">
                  <div>
                    <h3
                      class="text-center text-2xl font-medium text-gray-900"
                      id="tier-hobby">
                      Online Event Ticket
                    </h3>
                    <div class="mt-4 flex items-center justify-center">
                      <span
                        class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                        <span class="mt-2 mr-2 text-4xl font-medium"> $ </span>
                        <span class="font-extrabold">
                          {eventTicket.price}
                        </span>
                      </span>
                      <span class="text-xl font-medium text-gray-500">
                        / per event
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                  <ul class="space-y-4">
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <Check />
                      </div>
                      <p class="ml-3 text-base font-medium text-gray-500">
                        Full Access to Event
                      </p>
                    </li>

                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <Check />
                      </div>
                      <p class="ml-3 text-base font-medium text-gray-500">
                        Join any Session
                      </p>
                    </li>

                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <Check />
                      </div>
                      <p class="ml-3 text-base font-medium text-gray-500">
                        Create any Session
                      </p>
                    </li>
                  </ul>
                  <div class="mt-8">
                    <div class="flex flex-col">
                      <StandardButton
                        on:click="{() => handleAddEventTicketClick()}">
                        Purchase
                      </StandardButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
            <div class="relative rounded-lg shadow-xl">
              <div
                class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
                aria-hidden="true">
              </div>
              <div class="absolute inset-x-0 top-0 transform translate-y-px">
                <div class="flex justify-center transform -translate-y-1/2">
                  <span
                    class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                    Best Value
                  </span>
                </div>
              </div>
              <div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
                <div>
                  <h3
                    class="text-center text-3xl font-semibold text-gray-900 sm:-mx-6"
                    id="tier-growth">
                    THAT Membership
                  </h3>
                  <div class="mt-4 flex items-center justify-center">
                    <span
                      class="px-3 flex items-start text-6xl tracking-tight text-gray-900 sm:text-6xl">
                      <span class="mt-2 mr-2 text-4xl font-medium"> $ </span>
                      <span class="font-extrabold">
                        {membership.price || ''}
                      </span>
                    </span>
                    <span class="text-2xl font-medium text-gray-500">
                      /year
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
                <ul class="space-y-4">
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <Check />
                    </div>
                    <p class="ml-3 text-base font-medium text-gray-500">
                      Access to all online monthly events
                    </p>
                  </li>

                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <Check />
                    </div>
                    <p class="ml-3 text-base font-medium text-gray-500">
                      $50 off 1 THAT Conference Camper Ticket
                    </p>
                  </li>

                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <Check />
                    </div>
                    <p class="ml-3 text-base font-medium text-gray-500">
                      10% off at THAT Store
                    </p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <Check />
                    </div>
                    <p class="ml-3 text-base font-medium text-gray-500">
                      Yearly Commitment, Automatic Renewal
                    </p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <Check />
                    </div>
                    <p class="ml-3 text-base font-medium text-gray-500">
                      First access to new platform features
                    </p>
                  </li>
                </ul>
                <div class="mt-10">
                  <div class="flex flex-col">
                    <HighlightButton
                      on:click="{() => handleAddMembershipClick()}">
                      Purchase
                    </HighlightButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3">
            <div
              class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg">
              <div class="flex-1 flex flex-col">
                <div class="bg-white px-6 py-10">
                  <div>
                    <h3
                      class="text-center text-2xl font-medium text-gray-900"
                      id="tier-scale">
                      Daily Usage
                    </h3>
                    <div class="mt-4 flex items-center justify-center">
                      <span
                        class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                        <span class="font-extrabold"> Free </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                  <ul class="space-y-4">
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <!-- Heroicon name: check -->
                        <svg
                          class="flex-shrink-0 h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p class="ml-3 text-base font-medium text-gray-500">
                        Join Activities
                      </p>
                    </li>

                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <!-- Heroicon name: check -->
                        <svg
                          class="flex-shrink-0 h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p class="ml-3 text-base font-medium text-gray-500">
                        Create Activities
                      </p>
                    </li>

                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <Ban />
                      </div>
                      <p class="ml-3 text-base font-medium text-gray-500">
                        No access to monthly events
                      </p>
                    </li>
                  </ul>
                  <div class="mt-8">
                    <div class="flex flex-col">
                      <StandardButton
                        on:click="{() => login('/my/settings/profile', true)}">
                        Get Started
                      </StandardButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
