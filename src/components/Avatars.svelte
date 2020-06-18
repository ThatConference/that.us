<script>
  export let host;
  export let attendees;
</script>

<div class="flex overflow-hidden">

  <img
    class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
    src={host.profileImage}
    alt="" />

  {#each attendees as attendee}
    <img
      class="-ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid"
      src={attendee.profileImage}
      alt="" />
  {/each}
</div>
