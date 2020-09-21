<script>
  export let router;

  // 3rd party
  import { getClient } from '@urql/svelte';
  import { FacebookLoader } from 'svelte-content-loader';

  // ui support
  import { ModalError, ActionHeader } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import ActivityDetails from '../../components/activities/ActivityDetails.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  // data sources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';

  const { activityId } = router.params;
  const { getById } = sessionsApi(getClient());
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Activity Details" />
  </div>
  <div slot="body">
    {#await getById(activityId)}
      <div class="flex items-center justify-center">
        <FacebookLoader uniqueKey="loading" />
      </div>
    {:then activities}
      <ActivityDetails {...activities} />
    {:catch error}
      <ModalError
        title="No Activities Found"
        text="I'm sorry we weren't able to find the activity you requested."
        action="{{ title: 'Return to Activities', href: '/activities' }}"
      />
    {/await}
  </div>
</StackedLayout>
