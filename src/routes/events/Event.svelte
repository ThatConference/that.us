<script>
  import { getClient } from '@urql/svelte';
  import { router } from 'yrv';

  import metaTagsStore from '../../store/metaTags';
  import currentEvent from '../../store/currentEvent';
  import eventsApi from '../../dataSources/api.that.tech/events/queries';

  import Hybrid from './components/_Hybrid.svelte';
  import Online from './components/_Online.svelte';

  const { id, name } = $router.params;
  const eventSlug = `${id}/${name}`;

  let eventFormat;

  metaTagsStore.set({
    title: 'Events - THAT',
    description: 'Upcoming and Past Events at THAT',
    openGraph: {
      type: 'website',
      url: 'https://that.us/events',
    },
  });

  function queryEvent() {
    eventFormat = Online; // todo later set based on event results
    return eventsApi(getClient())
      .queryEventBySlug(eventSlug)
      .then(event => {
        currentEvent.set({ eventId: event.id, title: event.name });
        return event;
      });
  }
</script>

{#await queryEvent() then event}
  <svelte:component this="{eventFormat}" event="{event}" />
{/await}
