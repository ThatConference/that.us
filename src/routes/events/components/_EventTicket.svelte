<script>
  export let event;

  import dayjs from 'dayjs';

  import Icon from 'svelte-awesome';
  import { commentsO, hashtag, codeFork } from 'svelte-awesome/icons';

  import { createEventDispatcher } from 'svelte';
  import { Standard as StandardButton } from '../../../elements/buttons';
  import { Check } from '../../../elements/svgs';

  const ticket = event.products
    .filter(f => f.isEnabled)
    .find(e => e.productType === 'TICKET');

  const dispatch = createEventDispatcher();
</script>

<div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
  <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
    <div class="relative">
      <h2
        class="text-center text-3xl leading-8 font-extrabold tracking-tight text-thatBlue-800 sm:text-4xl">
        This isn't just another online event
      </h2>
      <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
        {event.description}
      </p>
    </div>

    <div
      class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
      <div class="relative">
        <h3
          class="text-2xl font-extrabold text-thatBlue-800 tracking-tight sm:text-3xl">
          A format that support interaction
        </h3>
        <p class="mt-3 text-lg text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          minima sequi recusandae, porro maiores officia assumenda aliquam
          laborum ab aliquid veritatis impedit odit adipisci optio iste
          blanditiis facere. Totam, velit.
        </p>

        <dl class="mt-10 space-y-10">
          <div class="flex">
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center h-12 w-12 rounded-md bg-thatOrange-400 text-white">
                <Icon data="{commentsO}" class="h-8 w-8" />
              </div>
            </div>
            <div class="ml-4">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                We're all speakers
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Everyone on of us has something we can offer. Our experiences
                help define us, sharing those help us all grow.
              </dd>
            </div>
          </div>

          <div class="flex">
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center h-12 w-12 rounded-md bg-thatOrange-400 text-white">
                <Icon data="{hashtag}" class="h-8 w-8" />
              </div>
            </div>
            <div class="ml-4">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Any Topic
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Tech moves fast. Really fast.
              </dd>
            </div>
          </div>

          <div class="flex">
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center h-12 w-12 rounded-md bg-thatOrange-400 text-white">
                <Icon data="{codeFork}" class="h-8 w-8" />
              </div>
            </div>
            <div class="ml-4">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Any Format
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <div class="mt-10 relative" aria-hidden="true">
        <div class="p-12">
          <div class="flex flex-col rounded-xl shadow-lg">
            <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
              <div class="inline-flex items-center">
                <div>
                  <span
                    class="px-4 py-1 leading-5 rounded-full text-sm font-semibold tracking-wide uppercase bg-thatOrange-400 text-white">
                    THAT Online - Event Ticket
                  </span>
                </div>
              </div>
              <div class="mt-4 flex items-baseline text-6xl font-extrabold">
                ${ticket.price}
                <span class="ml-1 text-2xl font-medium text-gray-500">
                  usd
                </span>
              </div>
              <p class="mt-5 text-lg text-gray-500">
                {event.name}
              </p>
              <p class="text-lg text-gray-500">
                {dayjs(event.startDate).format('dddd MMMM D, YYYY - h:mm A')}
              </p>
            </div>
            <div
              class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <Check />
                  </div>
                  <p class="ml-3 text-base text-gray-700">
                    Full Access All Day
                  </p>
                </li>

                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <Check />
                  </div>
                  <p class="ml-3 text-base text-gray-700">
                    Create and Moderate Activities
                  </p>
                </li>

                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <Check />
                  </div>
                  <p class="ml-3 text-base text-gray-700">Join Any Activity</p>
                </li>

                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <Check />
                  </div>
                  <p class="ml-3 text-base text-gray-700">
                    Supports Future Platform Growth
                  </p>
                </li>
              </ul>
              <StandardButton
                on:click="{() => dispatch('purchase-event-ticket')}">
                Purchase
              </StandardButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mt-12 sm:mt-16 lg:mt-24">
      <div
        class="px-4 lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div class="lg:col-start-2">
          <h3
            class="text-2xl font-extrabold text-thatBlue-800 tracking-tight sm:text-3xl">
            Always in the loop
          </h3>
          <p class="mt-3 text-lg text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex
            obcaecati natus eligendi delectus, cum deleniti sunt in labore nihil
            quod quibusdam expedita nemo.
          </p>

          <dl class="mt-10 space-y-10">
            <div class="flex">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-thatOrange-400 text-white">
                  <!-- Heroicon name: outline/annotation -->
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <dt class="text-lg leading-6 font-medium text-gray-900">
                  Mobile notifications
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>

            <div class="flex">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-thatOrange-400 text-white">
                  <!-- Heroicon name: outline/mail -->
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <dt class="text-lg leading-6 font-medium text-gray-900">
                  Reminder emails
                </dt>
                <dd class="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
          <svg
            class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
            width="784"
            height="404"
            fill="none"
            viewBox="0 0 784 404"
            aria-hidden="true">
            <defs>
              <pattern
                id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse">
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"></rect>
              </pattern>
            </defs>
            <rect
              width="784"
              height="404"
              fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"></rect>
          </svg>
          <img
            class="relative mx-auto"
            width="490"
            src="https://tailwindui.com/img/features/feature-example-2.png"
            alt="" />
        </div>
      </div>
    </div>
  </div>
</div>
