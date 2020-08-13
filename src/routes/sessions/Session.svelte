<script>
  export let router;

  // 3rd party
  import { query } from '@urql/svelte';
  import { getClient } from '@urql/svelte';
  import { FacebookLoader } from 'svelte-content-loader';
  import { fade } from 'svelte/transition';

  // ui support
  import { ModalError, ActionHeader, LinkButton } from '../../elements';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import SessionDetails from './SessionDetails.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  // stores
  import currentEvent from '../../store/currentEvent';

  // data sources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';

  const { sessionId } = router.params;
  const { getById } = sessionsApi(getClient());
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Session Details" />
  </div>
  <div slot="body">

    {#await getById(sessionId)}
      <div class="flex items-center justify-center">
        <FacebookLoader uniqueKey="loading" />
      </div>
    {:then session}
      <SessionDetails {...session} />
    {:catch error}
      <ModalError
        title="No Session Found"
        text="I'm sorry we weren't able to find the session you requested."
        action="{{ title: 'Return to Sessions', href: '/sessions' }}"
      />
    {/await}
  </div>

</StackedLayout>
