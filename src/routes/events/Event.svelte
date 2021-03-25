<script>
  import { getClient } from '@urql/svelte';
  import { router } from 'yrv';

  import metaTagsStore from '../../store/metaTags';
  import currentEvent from '../../store/currentEvent';
  import eventsApi from '../../dataSources/api.that.tech/events/queries';

  import Hybrid from './components/_Hybrid.svelte';
  import MultiDay from './components/_MultiDay.svelte';
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
    return eventsApi(getClient())
      .queryEventBySlug(eventSlug)
      .then(event => {
        switch (event.type) {
          case 'HYBRID_MULTI_DAY':
            eventFormat = Hybrid;
            currentEvent.set({ eventId: event.id, title: event.name });
            break;

          case 'MULTI_DAY':
            eventFormat = MultiDay;
            currentEvent.set({ eventId: event.id, title: event.name });
            break;

          default:
            eventFormat = Online;
            currentEvent.set({ eventId: event.id, title: event.name });
            break;
        }

        return event;
      });
  }
</script>

{#await queryEvent() then event}
  <svelte:component this="{eventFormat}" event="{event}" />
{/await}
