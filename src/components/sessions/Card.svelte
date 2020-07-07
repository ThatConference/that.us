<script>
  import { Link } from 'yrv';
  import dayjs from 'dayjs';

  import Tag from './Tag.svelte';

  export let id;
  export let title;
  export let shortDescription;
  export let startTime;
  export let speakers;
  export let status;
  export let tags = [];
  export let __typename; // just here to clean up props
  export let attendees = []; // todo.. needs to be favorites

  let canJoin = () => true; // todo.. need to set between the two...
  let host = speakers[0];
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<div class="w-full flex items-center justify-between p-3 space-x-6">

  <div class="flex-1">
    <div class="flex items-center space-x-3">
      <img
        class="w-15 h-15 bg-gray-300 rounded-full flex-shrink-0"
        src="{`${host.profileImage}${imageCrop}`}"
        alt="{`${host.firstName} ${host.lastName}`}"
      />
      <h3 class="text-gray-900 text-sm leading-5 font-medium break-words">
        {title}
      </h3>
    </div>

  </div>
</div>

<div class="px-3">
  <p class="text-gray-500 text-sm leading-5 break-words">{shortDescription}</p>
</div>

<div class="flex flex-wrap items-center justify-around space-x-2 px-6 py-2">
  {#each tags as t}
    <Tag>{t}</Tag>
  {/each}
</div>

<div class="border-t border-gray-200">
  <div class="-mt-px flex">
    <div class="w-0 flex-1 flex border-r border-gray-200">
      <Link
        href="/sessions/{id}"
        class="relative -mr-px w-0 flex-1 inline-flex items-center
        justify-center py-4 text-sm leading-5 text-gray-700 font-medium border
        border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none
        focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition
        ease-in-out duration-150"
      >
        <svg
          class="w-5 h-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997
            1.884z"
          ></path>
          <path
            d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
          ></path>
        </svg>
        <span class="ml-3">More Details</span>
      </Link>
    </div>
    {#if canJoin()}
      <div class="-ml-px w-0 flex-1 flex">
        <Link
          href="/join/{id}"
          class="relative w-0 flex-1 inline-flex items-center justify-center
          py-4 text-sm leading-5 text-gray-700 font-medium border
          border-transparent rounded-br-lg hover:text-gray-500
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300
          focus:z-10 transition ease-in-out duration-150"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54
              1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0
              011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2
              12.18 2 5V3z"
            ></path>
          </svg>
          <span class="ml-3">Join In</span>
        </Link>
      </div>
    {/if}
  </div>
</div>
