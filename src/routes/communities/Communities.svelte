<script>
  import { getClient } from '@urql/svelte';
  // import SvelteInfiniteScroll from 'svelte-infinite-scroll'; todo.. add back once we have paged communities
  import { useMachine } from 'xstate-svelte';

  import Hero from './_CommunitiesHero.svelte';
  // import { Waiting } from '../../elements'; todo.. add back once we have paged communities
  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import CommunityCard from '../../components/communities/CommunityCard.svelte';

  import createMachine from './machines/communities';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Communities - THAT',
    description: 'tbd',
    openGraph: {
      type: 'website',
      url: `https://that.us/communities`,
    },
  });

  const { state, send } = useMachine(createMachine(getClient()), {
    devTools: true,
  });
</script>

<Layout>
  <main class="overflow-hidden">
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
        <main>
          <Hero />
          <div class="py-20">
            <div class="px-8">
              <!-- TODO -- Pulling now to see how the UX really is once deployed -->
              <!-- {#if ['loadingCommunities'].some($state.matches)}
                <div class="w-full flex flex-col items-center justify-center">
                  <Waiting />
                </div>
              {/if} -->

              <ul
                class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                  lg:grid-cols-5"
              >
                {#each $state.context.communities as c (c.id)}
                  <li class="col-span-1 flex flex-col">
                    <button
                      on:click="{() => send('SELECTED', { slug: c.slug })}"
                      class="focus:outline-none"
                    >
                      <CommunityCard community="{c}" />
                    </button>
                  </li>
                {/each}

                <!-- 
                  todo.. add back once the api has paged communities
                  <SvelteInfiniteScroll
                  window
                  threshold="{25}"
                  on:loadMore="{() => send('LOADNEXT')}"
                  /> 
                -->
              </ul>
              <!-- 
                todo.. add back once the api has paged communities
                {#if ['loadingNextCommunities'].some($state.matches)}
                  <div class="flex flex-grow justify-center py-12">
                    <Waiting />
                  </div>
                {/if} 
              -->
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</Layout>
