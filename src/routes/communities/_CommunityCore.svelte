<script>
  export let community;
  
  import { fade } from 'svelte/transition';
  import {navigateTo} from 'yrv';
  

  import metaTagsStore from '../../store/metaTags';
  
  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from './_UpNext.svelte';
  import Hero from './_Hero.svelte';
import communities from '../../dataSources/api.that.tech/communities';

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

</script>

{#if community}
  <div class="flex flex-col">
    
    <div in:fade="{{ delay: getDelay() }}">
      <Hero community="{community}"/>
    </div>
    
    <div in:fade="{{ delay: getDelay() }}">
      <NewestFollowers />
    </div>
    
    <div in:fade="{{ delay: getDelay() }}">
      <UpNext communityName="{community.name}" activities="{community.sessions.sessions}"/>
    </div>
    
    <div in:fade="{{ delay: getDelay() }}">
      <CTA communityName="{community.name}" communityHandle="@{community.name}" />
    </div>
  </div>
{/if}