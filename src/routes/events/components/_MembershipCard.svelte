<script>
  export let event;

  import { Link } from 'yrv';
  import { createEventDispatcher } from 'svelte';

  import { Highlight as HighlightButton } from '../../../elements/buttons';
  import { CheckFull } from '../../../elements/svgs';

  const membershipDetails = event.products
    .filter(f => f.isEnabled)
    .find(e => e.productType === 'MEMBERSHIP');

  const dispatch = createEventDispatcher();

  function handlePurchaseMembershipOnClick() {
    dispatch('purchase-membership');
  }
</script>

<div class="relative bg-thatBlue-100 bg-opacity-25">
  <div class="pt-12 sm:pt-16 lg:pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot name="header" />
    </div>
  </div>
  <div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
    <div class="relative">
      <div class="absolute inset-0 h-1/2"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
          <div class="flex-1 bg-white px-6 py-8 lg:p-12">
            <h3 class="text-2xl font-extrabold text-thatBlue-800 sm:text-3xl">
              THAT Membership
            </h3>
            <p class="mt-6 text-base text-gray-500">
              Includes every online event, every feature and even a discount to
              <span class="px:2 text-that-orange hover:text-thatOrange-500">
                <Link href="https://thatconference.com?utm_source=THAT">
                  THAT Conference
                </Link>
              </span>
              while helping us manage our yearly budget.
            </p>
            <div class="mt-8">
              <div class="flex items-center">
                <h4
                  class="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-thatOrange-400">
                  What's included
                </h4>
                <div class="flex-1 border-t-2 border-gray-200"></div>
              </div>
              <ul
                class="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                <li class="flex items-center lg:col-span-1">
                  <div>
                    <span
                      class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                      <CheckFull height="h-4" width="h-4" />
                    </span>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">
                    Full Access to every monthly online event
                  </p>
                </li>

                <li class="flex items-center lg:col-span-1">
                  <div>
                    <span
                      class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                      <CheckFull height="h-4" width="h-4" />
                    </span>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">
                    $50 off 1 THAT Conference Camper Ticket
                  </p>
                </li>

                <li class="flex items-center lg:col-span-1">
                  <div>
                    <span
                      class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                      <CheckFull height="h-4" width="h-4" />
                    </span>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">
                    10% off at THAT Store
                  </p>
                </li>

                <li class="flex items-center lg:col-span-1">
                  <div>
                    <span
                      class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                      <CheckFull height="h-4" width="h-4" />
                    </span>
                  </div>
                  <p class="ml-3 text-sm text-gray-700">
                    First access to all new platform features
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
            <p class="text-lg leading-6 font-medium text-gray-900">
              Year Commitment, Automatic Renewal
            </p>

            <div class="mt-4 flex items-center justify-center">
              <span
                class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                <span class="mr-2 text-4xl font-medium">$</span>
                <span class="font-extrabold">{membershipDetails.price}</span>
                <span
                  class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
                  USD
                </span>
              </span>
            </div>

            <p class="mt-4 text-sm">
              <Link
                href="/membership/pricing"
                class="font-medium text-gray-500 underline">
                Learn More
              </Link>
            </p>
            <div class="mt-8">
              <div class="flex flex-col">
                <HighlightButton on:click="{handlePurchaseMembershipOnClick}">
                  Purchase
                </HighlightButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
