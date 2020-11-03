<script>
  export let slug;

  // 3rd party
  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  // ui support
  import Hero from './_Hero.svelte';
  import FeaturedMembers from './_FeaturedMembers.svelte';
  import Goals from './_Goals.svelte';

  // utilities
  import createMachine from './machines/partner';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Partner Showcase - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/partners/${slug}`,
    },
  });

  const { state, send } = useMachine(createMachine(slug));
  let delayCounter = 200;

  function getDelay(reset = false) {
    let current = delayCounter;
    delayCounter = delayCounter + 200;

    if (reset) delayCounter = 200;
    return current;
  }
</script>

{(console.log({ $state }), '')}

{#if ['profileLoaded'].some($state.matches)}
  <div class="flex flex-col">
    <div in:fade="{{ delay: getDelay() }}">
      <Hero partner="{$state.context.profile}" />
    </div>

    {#if $state.context.profile.members && $state.context.profile.members.length > 0}
      <div in:fade="{{ delay: getDelay() }}">
        <FeaturedMembers members="{$state.context.profile.members}" />
      </div>
    {/if}

    {#if $state.context.profile.goals && $state.context.profile.goals.length > 0}
      <div in:fade="{{ delay: getDelay() }}">
        <Goals goals="{$state.context.profile.goals}" />
      </div>
    {/if}

    <!-- 
    
    <div in:fade="{{ delay: getDelay() }}">
    </div>

    <div in:fade="{{ delay: getDelay(true) }}">
    </div> 

    -->
  </div>
{/if}
