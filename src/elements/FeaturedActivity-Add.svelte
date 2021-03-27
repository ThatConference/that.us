<script>
  export let eventId;

  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';
  import { plusCircle } from 'svelte-awesome/icons';

  import { isAuthenticated, thatProfile } from '../utilities/security';
  import { imageCrops } from '../config';

  const baseSlug = '/activities/create';

  let isHover = false;
  let createLink = eventId ? `${baseSlug}#/event/${eventId}` : baseSlug;
</script>

<Link href="{createLink}">
  <div
    class="transition duration-500 ease-in-out transform hover:scale-105 w-full h-full py-10 px-6 hover:bg-thatBlue-400 bg-that-blue
      text-center shadow rounded-lg xl:px-10 xl:text-left"
    on:mouseenter="{() => (isHover = true)}"
    on:mouseleave="{() => (isHover = false)}">
    <div class="space-y-6 xl:space-y-10">
      <div class="flex justify-center">
        {#if $isAuthenticated && $thatProfile}
          {#if isHover}
            <Icon
              data="{plusCircle}"
              class="text-thatBlue-100 h-40 w-40 xl:w-56 xl:h-56" />
          {:else}
            <img
              class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
              src="{`${$thatProfile.profileImage}${imageCrops.profile}`}"
              alt="{`${$thatProfile.firstName} ${$thatProfile.lastName}`}" />
          {/if}
        {:else}
          <Icon
            data="{plusCircle}"
            class="text-thatBlue-100 h-40 w-40 xl:w-56 xl:h-56" />
        {/if}
      </div>

      <div
        class="font-medium text-lg leading-6 space-y-2 w-full h-full flex flex-col">
        <h4 class="space-y-1 flex-grow text-white">
          What Activity will you create?
        </h4>
        <p class="text-thatBlue-200 text-sm italic">Any Day, Any Time</p>

        <span class="text-thatBlue-200 text-right">
          {#if $isAuthenticated && $thatProfile}
            <p>{`${$thatProfile.firstName} ${$thatProfile.lastName}`}</p>
          {:else}
            <p>Your Name Here :)</p>
          {/if}
        </span>
      </div>
    </div>
  </div>
</Link>
