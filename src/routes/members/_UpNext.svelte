<script>
  import { getClient } from '@urql/svelte';

  // datasources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import currentEvent from '../../store/currentEvent';

  import UpNextMemberHero from '../../components/activities/UpNextMemberHero.svelte';

  const { querySessionsByDate } = sessionsApi(getClient());
</script>

<section>
  {#await querySessionsByDate($currentEvent.eventId) then activities}
    <UpNextMemberHero activities="{activities}" />
  {/await}
</section>
