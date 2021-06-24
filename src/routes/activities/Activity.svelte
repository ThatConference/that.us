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
  import sessionsQueryApi from '../../dataSources/api.that.tech/sessions/queries';

  const { querySessionDropDownValues } = sessionsQueryApi(getClient());
  function getSessionLookupValues() {
    return querySessionDropDownValues();
  }

  const { id } = router.params;
  const { getById } = sessionsApi(getClient());

  const getSessionData = async sessionId => {
    const session = getById(sessionId);
    const sessionLookups = getSessionLookupValues();

    return Promise.all([session, sessionLookups]);
  };
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Activity Details" />
  </div>
  <div slot="body">
    {#await getSessionData(id)}
      <div class="flex items-center justify-center">
        <FacebookLoader uniqueKey="loading" />
      </div>
    {:then [activity, sessionLookups]}
      <ActivityDetails
        {...activity}
        sessionLocation="{activity.location}"
        sessionLookups="{sessionLookups}" />
    {:catch error}
      <ModalError
        title="No Activities Found"
        text="I'm sorry we weren't able to find the activity you requested."
        action="{{ title: 'Return to Activities', href: '/activities' }}" />
    {/await}
  </div>
</StackedLayout>
