<script>
  export let host;
  export let attendees;

  import config from '../config';

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<div class="flex overflow-hidden">
  {#if host}
    <img
      class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
      src="{`${host.profileImage || config.defaultProfileImage}${imageCrop}`}"
      alt="`${host.firstName} ${host.lastName}`}"
    />
  {/if}

  {#each attendees as attendee, i}
    <a
      href="https://www.thatconference.com/member/{attendee.profileSlug}"
      class="-ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid"
      class:-ml-2="{host || i > 0}"
      target="_blank"
    >
      <img
        src="{`${attendee.profileImage || config.defaultProfileImage}${imageCrop}`}"
        alt="{`${attendee.firstName} ${attendee.lastName}`}"
        title="{`${attendee.firstName} ${attendee.lastName}`}"
      />
    </a>
  {/each}
</div>
