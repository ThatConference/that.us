<script>
  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import _ from 'lodash';

  import Layout from '../elements/layouts/ContentLayout.svelte';

  import metaTagsStore from '../store/metaTags';
  import { Waiting } from '../elements';
  import Hero from '../components/members/Hero.svelte';
  import MemberCard from '../components/members/MemberCard.svelte';
  import CardLoader from '../components/CardLoader.svelte';

  import membersApi from '../dataSources/api.that.tech/members';

  const { queryMembers, queryMembersNext } = membersApi(getClient());

  let loadingMore = false;
  let memberList = [];
  let cursor;
  let loading = true;

  $: memberList = [];

  onMount(async () => {
    const members = await queryMembers();

    memberList = [...memberList, ...members.members];
    cursor = members.cursor;
    loading = false;
  });

  async function getNext() {
    loadingMore = true;
    const nextResults = await queryMembersNext(cursor);

    if (nextResults) {
      memberList = _.uniqBy([...memberList, ...nextResults.members], i => i.id);
      cursor = nextResults.cursor;
    }
    loadingMore = false;
  }

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
              {#if loading}
                <CardLoader />
              {/if}
              <ul
                class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
                  lg:grid-cols-5"
              >
                {#each memberList as m (m.id)}
                  <li
                    class="col-span-1 flex flex-col text-center bg-white
                      rounded-lg shadow"
                  >
                    <MemberCard {...m} />
                  </li>
                {/each}
                <SvelteInfiniteScroll
                  window
                  threshold="{25}"
                  on:loadMore="{() => getNext()}"
                />
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
