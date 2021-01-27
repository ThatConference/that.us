<script>
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { useMachine } from 'xstate-svelte';
  import { Link } from 'yrv';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import Hero from '../../components/partners/Hero.svelte';
  import PartnerCard from '../../components/partners/PartnerCard.svelte';
  import { Waiting } from '../../elements';

  import metaTagsStore from '../../store/metaTags';
  import partnerMachine from './machines/partners';
  import { debug } from '../../config';

  metaTagsStore.set({
    title: 'Partners - THAT',
    description:
      'Thank you to those who support our great community every day.',
    openGraph: {
      type: 'website',
      url: `https://that.us/partners`,
    },
  });

  const { state, send } = useMachine(partnerMachine(), {
    devTools: debug.xstate,
  });

  function handleNext() {
    send('NEXT');
  }
</script>

<Layout>
  <main class="overflow-hidden">
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
        <Hero />
        <div class="mt-12 py-12">
          {#if ['init'].some($state.matches)}
            <div class="mb-24 w-full flex flex-col items-center justify-center">
              <Waiting />
            </div>
          {/if}

          <ul
            class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {#each $state.context.items as p, i (p.id)}
              <li
                class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow transform hover:scale-110 hover:bg-that-offWhite"
              >
                <Link open href="{`/partners/${p.slug}`}">
                  <PartnerCard {...p} />
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
    </div>
  </main>
</Layout>
