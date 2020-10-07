<script>
  import dayjs from 'dayjs';
  /* 
    TODO
    if there are no events upcoming, we should then swap the section to 
    see some of the sessions from the past.
  */

  export let activities = [];

  let filteredActivities = activities.filter(
    a => !dayjs(a.startTime).isBefore(dayjs()),
  );

  import UpNextMemberHero from '../../components/activities/UpNextMemberHero.svelte';
</script>

<section>
  <!-- {#if activities.length > 0} -->
  <UpNextMemberHero activities="{filteredActivities}" />
  <!-- {/if} -->
</section>
