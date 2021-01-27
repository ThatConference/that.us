<script>
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { useMachine } from 'xstate-svelte';
  import { Link } from 'yrv';

  import Hero from './_CommunitiesHero.svelte';
  import { Waiting } from '../../elements';
  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import CommunityCard from '../../components/communities/CommunityCard.svelte';

  import createMachine from './machines/communities';
  import metaTagsStore from '../../store/metaTags';
  import { debug } from '../../config';

  const { state, send } = useMachine(createMachine(), {
    devTools: debug.xstate,
  });

  metaTagsStore.set({
    title: 'Communities - THAT',
    description: 'tbd',
    openGraph: {
      type: 'website',
      url: `https://that.us/communities`,
    },
  });

  function handleNext() {
    send('NEXT');
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
              {#if ['init'].some($state.matches)}
                <div class="w-full flex flex-col items-center justify-center">
                  <Waiting />
                </div>
              {/if}

              <ul
                class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                  lg:grid-cols-5"
              >
                {#each $state.context.items as c (c.id)}
                  <li
                    class="col-span-1 bg-white rounded-lg shadow transform hover:scale-110 hover:bg-that-offWhite"
                  >
                    <Link
                      href="{`/communities/${c.slug}`}"
                      class="h-full flex flex-col justify-between p-4 text-center focus:outline-none"
                    >
                      <CommunityCard community="{c}" />
                    </Link>
                  </li>
                {/each}

                <SvelteInfiniteScroll
                  window
                  threshold="{100}"
                  on:loadMore="{handleNext}"
                />
              </ul>

              {#if ['loadingNext', 'loadedAll'].some($state.matches)}
                <div class="flex flex-grow justify-center py-12">
                  <Waiting />
                </div>
              {/if}
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</Layout>
