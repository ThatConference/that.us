<script>
  export let communityName;
  export let activities = [];
 
  import UpNextHero from '../../components/activities/UpNextHero.svelte';
 
</script>

<section>
    <UpNextHero activityName="{communityName}" activities="{activities}"/>  
</section>
