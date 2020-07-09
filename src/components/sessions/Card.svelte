<script>
  import { Link } from 'yrv';
  import dayjs from 'dayjs';
  import Icon from 'svelte-awesome';
  import { info, heart, signIn } from 'svelte-awesome/icons';

  import Tag from './Tag.svelte';
  import CardLink from './CardLink.svelte';

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
      <CardLink href="/sessions/{id}" icon="{info}" text="{'More Details'}" />
    </div>
    {#if canJoin()}
      <div class="-ml-px w-0 flex-1 flex">
        <CardLink href="/join/{id}" icon="{signIn}" text="{'Join In'}" />
      </div>
    {:else}
      <div class="-ml-px w-0 flex-1 flex">
        <!-- todo... needs to be a button as we need the onclick -->
        <Link
          href="#"
          class="relative w-0 flex-1 inline-flex items-center justify-center
          py-4 text-sm leading-5 text-gray-700 font-medium border
          border-transparent rounded-br-lg hover:text-gray-500
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300
          focus:z-10 transition ease-in-out duration-150"
        >

          <Icon data="{heart}" class="w-5 h-5 text-gray-400" />
          <span class="ml-3">Favorite</span>
        </Link>
      </div>
    {/if}
  </div>
</div>
