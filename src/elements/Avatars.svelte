<script>
  export let host;
  export let attendees;

  import { Link } from 'yrv';

  import config from '../config';

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<div class="flex flex-wrap overflow-hidden">
  {#if host}
    <img
      class="inline-block h-12 w-12 rounded-full text-white shadow-solid"
      src="{`${host.profileImage || config.defaultProfileImage}${imageCrop}`}"
      alt="{host.firstName} {host.lastName}"
    />
  {/if}

  {#each attendees as attendee, i}
    <span
      class="-ml-2 inline-block h-12 w-12 rounded-full text-white shadow-solid"
      class:-ml-2="{host || i > 0}"
    >
      <Link reload href="/members/{attendee.profileSlug}">
        <img
          src="{`${attendee.profileImage || config.defaultProfileImage}${imageCrop}`}"
          alt="{`${attendee.firstName} ${attendee.lastName}`}"
          title="{`${attendee.firstName} ${attendee.lastName}`}"
        />
      </Link>
    </span>
  {/each}
</div>
