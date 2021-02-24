<script>
  export let event;

  import { Link } from 'yrv';
  import { createEventDispatcher } from 'svelte';
  import Icon from 'svelte-awesome';
  import { checkCircle } from 'svelte-awesome/icons';

  import { Highlight as HighlightButton } from '../../../elements/buttons';

  const membershipDetails = event.products
    .filter(f => f.isEnabled)
    .find(e => e.productType === 'MEMBERSHIP');

  const dispatch = createEventDispatcher();
</script>

<div class="relative bg-thatBlue-100 bg-opacity-25">
  <div class="pt-12 sm:pt-16 lg:pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2
          class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
          Support Us, Supporting You.
        </h2>
        <p class="mt-4 text-xl text-gray-600">
          We could create a free platform, but then we'd have to monitize your
          data. To that we say, no thank you. Rather we're taking the approach
          of creating a monitization strategy of help us, help you.
        </p>
      </div>
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
                  <Icon data="{checkCircle}" class="text-green-400 h-5 w-5" />
                  <p class="ml-3 text-sm text-gray-700">
                    Full Access to every monthly online event
                  </p>
                </li>

                <li class="flex items-center lg:col-span-1">
                  <Icon data="{checkCircle}" class="text-green-400 h-5 w-5" />
                  <p class="ml-3 text-sm text-gray-700">
                    $50 off 1 THAT Conference Camper Ticket
                  </p>
                </li>

                <li class="flex items-center lg:col-span-1">
                  <Icon data="{checkCircle}" class="text-green-400 h-5 w-5" />
                  <p class="ml-3 text-sm text-gray-700">
                    10% off at THAT Store
                  </p>
                </li>

                <li class="flex items-center lg:col-span-1">
                  <Icon data="{checkCircle}" class="text-green-400 h-5 w-5" />
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
            <div
              class="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
              <span> ${membershipDetails.price} </span>
              <span class="ml-3 text-xl font-medium text-gray-500"> USD </span>
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
                <HighlightButton
                  on:click="{() => dispatch('purchase-membership')}">
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
