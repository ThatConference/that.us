<script>
  export let host;
  export let attendees;

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<div class="flex overflow-hidden">
  {#if host}
    <img
      class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
      src="{`${host.profileImage}${imageCrop}`}"
      alt="`${host.firstName} ${host.lastName}`}"
    />
  {/if}

  {#each attendees as attendee, i}
    <img
      class="-ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid"
      class:-ml-2="{host || i > 0}"
      src="{`${attendee.profileImage}${imageCrop}`}"
      alt="{`${attendee.firstName} ${attendee.lastName}`}"
    />
  {/each}
</div>
