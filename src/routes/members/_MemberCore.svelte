<script>
  export let member;

  import { fade } from 'svelte/transition';

  import metaTagsStore from '../../store/metaTags';

  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from './_UpNext.svelte';
  import MeritBadges from './_MeritBadges.svelte';
  import Hero from './_Hero.svelte';

  metaTagsStore.set({
    title: `${member.firstName} ${member.lastName} - THAT`,
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/members/${member.slug}`,
    },
  });
</script>

<div class="flex flex-col">
  <div in:fade="{{ delay: 200 }}">
    <Hero member="{member}" />
  </div>
  <div in:fade="{{ delay: 400 }}">
    <UpNext communityName="Node.js" />
  </div>
  <div in:fade="{{ delay: 600 }}">
    <CTA communityName="Node.js" communityHandle="@nodejs" />
  </div>
  <div in:fade="{{ delay: 800 }}">
    <MeritBadges meritBadges="{member.earnedMeritBadges}" />
    <NewestFollowers />
  </div>
</div>
