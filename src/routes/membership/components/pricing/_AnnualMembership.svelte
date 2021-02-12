<script>
export let membership;

import { navigateTo } from 'yrv';
import { getContext } from 'svelte';

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
</script>

<div class="text-white">
  <div class="pb-16 xl:flex xl:items-center xl:justify-between">
    <div>
      <h1 class="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
        <span class="">THAT Membership Only</span>
        <span class="text-thatOrange-400">${membership.price} a year</span>
      </h1>
      <p class="mt-5 text-xl">
        Includes every online event, every feature and even a discount to THAT
        Conference.
      </p>
    </div>

    <HighlightButton on:click="{() => handleAddMembershipClick()}">
      Add To Cart
    </HighlightButton>
  </div>

  <div class="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
    <div>
      <h2
        class="text-base font-semibold text-thatOrange-400 tracking-wide uppercase">
        Everything you need
      </h2>
      <p class="mt-2 text-3xl font-extrabold">All-in-one platform</p>
      <p class="mt-4 text-lg">
        Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
        Malesuada adipiscing sagittis vel nulla nec. Urna, sed a lectus
        elementum blandit et.
      </p>
    </div>
    <div
      class="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
      <ul class="divide-y divide-gray-200">
        <li class="py-4 flex md:py-0 md:pb-4">
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
          <span class="ml-3 text-base">
            Vitae in pulvinar odio id utobortis in inter.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Sed sed id viverra viverra augue eget massa.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Urna, gravida amet, a, integer venenatis.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Lobortis sed pharetra amet vitae eleifend.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Ullamcorper blandit a consequat donec elit aoreet.
          </span>
        </li>
      </ul>
      <ul
        class="border-t border-gray-200 divide-y divide-gray-200 md:border-t-0">
        <li class="py-4 flex md:border-t-0 md:py-0 md:pb-4">
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
          <span class="ml-3 text-base">
            Vitae in pulvinar odio id utobortis in inter.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Sed sed id viverra viverra augue eget massa.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Urna, gravida amet, a, integer venenatis.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base">
            Lobortis sed pharetra amet vitae eleifend.
          </span>
        </li>

        <li class="py-4 flex">
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
          <span class="ml-3 text-base"
            >Ullamcorper blandit a consequat donec elit aoreet.
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>
