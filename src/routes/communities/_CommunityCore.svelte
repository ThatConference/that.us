<script>
  export let community;
  
  import { fade } from 'svelte/transition';
  import { getClient } from '@urql/svelte';
  import {navigateTo} from 'yrv';
  
  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from './_UpNext.svelte';
  import Hero from './_Hero.svelte';

  import communitiesMutationApi from '../../dataSources/api.that.tech/mutations/communities';
  import metaTagsStore from '../../store/metaTags';

  if (!community) {
    navigateTo('/not-found');
  }

  metaTagsStore.set({
    title: 'Community - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/communities/`,
    },
  });

  let delayCounter = 200;
  function getDelay() {
    let current = delayCounter;
    delayCounter = delayCounter + 200;

    return current;
  }

  const { toggleCommunityFavorite } = communitiesMutationApi(getClient());

  function handleFollow() {
    const {id} = community;
    toggleCommunityFavorite(id);
  }

</script>

{#if community}
  <div class="flex flex-col">
    
    <div in:fade="{{ delay: getDelay() }}">
      <Hero community="{community}" handleFollow="{handleFollow}"/>
    </div>
    
    <div in:fade="{{ delay: getDelay() }}">
      <NewestFollowers followers="{community.followers.members}"/>
    </div>
    
    <div in:fade="{{ delay: getDelay() }}">
      <UpNext communityName="{community.name}" activities="{community.sessions.sessions}"/>
    </div>
    
    <div in:fade="{{ delay: getDelay() }}">
      <CTA communityName="{community.name}" communityHandle="@{community.name}" handleFollow="{handleFollow}"/>
    </div>
  </div>
{/if}