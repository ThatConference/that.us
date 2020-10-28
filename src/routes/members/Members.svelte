<script>
  import { getClient } from '@urql/svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import _ from 'lodash';
  import { useMachine } from 'xstate-svelte';

  import Layout from '../../elements/layouts/ContentLayout.svelte';

  import metaTagsStore from '../../store/metaTags';
  import { Waiting } from '../../elements';
  import Hero from '../../components/members/Hero.svelte';
  import MemberCard from '../../components/members/MemberCard.svelte';

  import memberMachine from './machines/members';

  const { state, send } = useMachine(memberMachine(getClient()));

  metaTagsStore.set({
    title: 'Members - THAT',
    description:
      'Our community is made of up geeks and geeklings across the world. Here are just a few.',
    openGraph: {
      type: 'website',
      url: `https://that.us/members`,
    },
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
              {#if ['init'].some($state.matches)}
                <div
                  class="mb-24 w-full flex flex-col items-center justify-center"
                >
                  <Waiting />
                </div>
              {/if}
              <ul
                class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                  lg:grid-cols-5"
              >
                {#each $state.context.items as m, i (m.id)}
                  <li class="col-span-1">
                    <MemberCard {...m} />
                  </li>
                {/each}
                <SvelteInfiniteScroll
                  window
                  threshold="{25}"
                  on:loadMore="{() => send('NEXT')}"
                />
              </ul>
              {#if ['loadingNext'].some($state.matches)}
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
