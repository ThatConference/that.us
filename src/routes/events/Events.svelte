<script>
  import { fade } from 'svelte/transition';
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';
  import { sortBy, take, drop } from 'lodash';

  import Hero from './components/events/_EventsHero.svelte';
  import EventCard from './components/_EventCard.svelte';
  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import CardLoader from '../../components/CardLoader.svelte';

  import eventsApi from '../../dataSources/api.that.tech/events/queries';
  import metaTagsStore from '../../store/metaTags';
  import dayjs from 'dayjs';

  metaTagsStore.set({
    title: 'Events - THAT',
    description: 'Upcoming and Past Events at THAT',
    openGraph: {
      type: 'website',
      url: 'https://that.us/events',
    },
  });

  function queryEvents() {
    return eventsApi(getClient())
      .queryEventsByCommunity()
      .then(r => sortBy(r, 'endDate').reverse())
      .then(r => {
        const splitAt = r.findIndex(i => dayjs(i.endDate).isBefore(dayjs()));

        const upcoming = take(r, splitAt)
          .filter(i => i.type.toLowerCase() !== 'daily')
          .reverse();
        const past = drop(r, splitAt);

        return [upcoming, past];
      });
  }
</script>

<Layout>
  <main class="overflow-hidden">
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
        <main>
          <Hero />
          <div class="py-20">
            <div class="px-8">
              {#await queryEvents()}
                <div class="w-full flex flex-col items-center justify-center">
                  <CardLoader showHeader="{false}" />
                </div>
              {:then events}
                <div class="relative mx-auto">
                  <div
                    class="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
                    {#each events[0] as e (e.id)}
                      <div
                        in:fade
                        class="transition duration-500 ease-in-out transform hover:scale-105">
                        <Link href="{`/events/${e.slug}`}">
                          <EventCard event="{e}" />
                        </Link>
                      </div>
                    {/each}
                  </div>

                  <div class="relative m-12">
                    <div
                      class="absolute inset-0 flex items-center"
                      aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span
                        class="uppercase tracking-wider px-2 bg-white rounded-md text-sm text-gray-500">
                        Past Events
                      </span>
                    </div>
                  </div>

                  <div
                    class="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
                    {#each events[1] as e (e.id)}
                      <div
                        in:fade
                        class="transition duration-500 ease-in-out transform hover:scale-105">
                        <Link href="{`/events/${e.slug}`}">
                          <EventCard event="{e}" />
                        </Link>
                      </div>
                    {/each}
                  </div>
                </div>
              {/await}
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</Layout>
