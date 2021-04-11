<script>
  export let host;
  export let attendees;

  import { Link } from 'yrv';

  import config from '../config';

  let imageCrop = '?w=500&h=500&fit=crop';
</script>

<div class="flex flex-wrap -space-x-4 overflow-hidden">
  {#if host}
    <img
      class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
      src="{`${host.profileImage || config.defaultProfileImage}${imageCrop}`}"
      alt="{host.firstName} {host.lastName}" />
  {/if}

  {#each attendees as attendee, i}
    <span class="" class:-ml-2="{host || i > 0}">
      <Link reload href="/members/{attendee.profileSlug}">
        <img
          class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src="{`${
            attendee.profileImage || config.defaultProfileImage
          }${imageCrop}`}"
          alt="{`${attendee.firstName} ${attendee.lastName}`}"
          title="{`${attendee.firstName} ${attendee.lastName}`}" />
      </Link>
    </span>
  {/each}
</div>
