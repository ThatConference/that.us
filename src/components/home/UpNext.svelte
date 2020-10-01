<script>
  import { getClient } from '@urql/svelte';

  // datasources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import currentEvent from '../../store/currentEvent';

  import UpNextHero from '../activities/UpNextHero.svelte';

  const { querySessionsByDate } = sessionsApi(getClient());
</script>

{#await querySessionsByDate($currentEvent.eventId)}
  <p>loading...</p>
{:then activities}
  <UpNextHero activities="{activities}" />
{:catch error}
  <p>OH NO</p>
{/await}
