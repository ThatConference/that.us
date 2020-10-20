<script>
  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import _ from 'lodash';

  import { useMachine } from 'xstate-svelte';
  import { machine } from './machines/test';

  import Hero from './_CommunitiesHero.svelte';

  import { Waiting } from '../../elements';
  import Layout from '../../elements/layouts/ContentLayout.svelte';

  import CommunityCard from '../../components/communities/CommunityCard.svelte';

  import metaTagsStore from '../../store/metaTags';
  import communitiesApi from '../../dataSources/api.that.tech/community/queries';

  let loading = true;
  let loadingMore = false;
  $: communityList = [];
  let cursor;

  metaTagsStore.set({
    title: 'Communities - THAT',
    description: 'tbd',
    openGraph: {
      type: 'website',
      url: `https://that.us/communities`,
    },
  });

  // api call
  const { queryAllCommunities } = communitiesApi(getClient());

  onMount(async () => {
    const communities = await queryAllCommunities();

    communityList = [...communityList, ...communities];
    // cursor = members.cursor;
    loading = false;
  });

  // async function getNext() {
  //   loadingMore = true;
  //   const nextResults = await queryMembersNext(cursor);

  //   if (nextResults) {
  //     memberList = _.uniqBy([...memberList, ...nextResults.members], i => i.id);
  //     cursor = nextResults.cursor;
  //   }
  //   loadingMore = false;
  // }

  const { state, send } = useMachine(machine, { devTools: true });
</script>

<Layout>
  <main class="overflow-hidden">
    <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
        <main>
          <Hero />
          <div class="py-20">
            <div class="px-8">
              {#if loading}
                <!-- <CardLoader /> -->
                <div class="w-full flex flex-col items-center justify-center">
                  <Waiting />
                </div>
              {/if}
              <ul
                class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                  lg:grid-cols-5"
              >
                {#each communityList as c (c.id)}
                  <li class="col-span-1 flex flex-col">
                    <CommunityCard community="{c}" />
                  </li>
                {/each}

                <!-- <SvelteInfiniteScroll
                  window
                  threshold="{25}"
                  on:loadMore="{() => getNext()}"
                /> -->
              </ul>
              {#if loadingMore}
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
