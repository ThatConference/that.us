<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import _ from 'lodash';

  import { Waiting } from '../elements';
  import Hero from '../components/members/Hero.svelte';
  import Footer from '../components/Footer.svelte';
  import MemberCard from '../components/members/MemberCard.svelte';
  import CardLoader from '../components/CardLoader.svelte';

  import membersApi from '../dataSources/api.that.tech/members';

  const { queryMembers, queryMembersNext } = membersApi(getClient());

  const queryInit = queryMembers();

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
</script>

<main>
  <Hero />
  <div class="relative bg-white overflow-hidden py-12">
    <div class="max-w-screen-xl mx-auto px-8">

      {#if loading}
        <CardLoader />
      {/if}
      <ul
        class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5"
      >

        {#each memberList as m (m.id)}
          <li
            class="col-span-1 flex flex-col text-center bg-white rounded-lg
            shadow"
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
  <Footer />
</main>
