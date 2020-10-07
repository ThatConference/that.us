<script>
  export let member;

  import { fade } from 'svelte/transition';

  import metaTagsStore from '../../store/metaTags';

  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from './_UpNext.svelte';
  import LifeHack from './_LifeHack.svelte';
  import MeritBadges from './_MeritBadges.svelte';
  import Hero from './_Hero.svelte';

  import WarningModal from '../../components/notifications/Warning.svelte';

  metaTagsStore.set({
    title: `${member.firstName} ${member.lastName} - THAT`,
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/members/${member.slug}`,
    },
  });

  let showModal = false;
  function handleFollow() {
    showModal = true;
  }

  let delayCounter = 200;
  function getDelay() {
    let current = delayCounter;
    delayCounter = delayCounter + 200;

    return current;
  }
</script>

<div class="flex flex-col">
  <div in:fade="{{ delay: getDelay() }}">
    <Hero member="{member}" on:click="{handleFollow}" />
  </div>

  {#if member.lifeHack}
    <div in:fade="{{ delay: getDelay() }}">
      <LifeHack
        quote="{member.lifeHack}"
        name="{`${member.firstName} ${member.lastName}`}"
      />
    </div>
  {/if}

  <div in:fade="{{ delay: getDelay() }}">
    <UpNext activities="{member.sessions}" />
  </div>

  <div in:fade="{{ delay: getDelay() }}">
    <CTA memberSlug="{member.profileSlug}" on:click="{handleFollow}" />

    {#if member.earnedMeritBadges.length > 0}
      <MeritBadges meritBadges="{member.earnedMeritBadges}" />
    {/if}

    {#if member.followers && member.followers.length > 0}
      <NewestFollowers />
    {/if}
  </div>

  {#if showModal}
    <WarningModal
      on:click="{() => (showModal = false)}"
      message="Not, yet. We're still working on this feature. Check back soon."
    />
  {/if}
</div>
