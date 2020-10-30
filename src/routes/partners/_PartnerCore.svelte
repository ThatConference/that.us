<script>
  export let slug;

  // 3rd party
  import { fade } from 'svelte/transition';
  import { useMachine } from 'xstate-svelte';

  // ui support
  import Hero from './_Hero.svelte';
  // import NewestFollowers from './_NewestFollowers.svelte';
  // import CTA from './_CTA.svelte';
  // import UpNext from '../../components/activities/UpNext.svelte';

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

<!-- {#if [{ init: 'loaded' }].some($state.matches)} -->
{#if ['profileLoaded'].some($state.matches)}
  <div class="flex flex-col">
    <div in:fade="{{ delay: getDelay() }}">
      <Hero partner="{$state.context.profile}" />
    </div>

    <div in:fade="{{ delay: getDelay() }}">
      <!-- <NewestFollowers
        stateMachineService="{$state.context.followMachineServices}"
      /> -->
    </div>

    <div in:fade="{{ delay: getDelay() }}">
      <!-- <UpNext
        stateMachineService="{$state.context.activitiesMachineServices}"
      /> -->
    </div>

    <div in:fade="{{ delay: getDelay(true) }}">
      <!-- <CTA
        isFollowing="{$state.context.isFollowing}"
        community="{$state.context.community}"
        on:community-follow="{() => send('FOLLOW', {
            id: $state.context.community.id,
          })}"
      /> -->
    </div>
  </div>
{/if}
