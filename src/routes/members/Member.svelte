<script>
  export let router;
  import { fade } from 'svelte/transition';
  import { getClient } from '@urql/svelte';

  import metaTagsStore from '../../store/metaTags';
  import ProfileLayout from '../../elements/layouts/Profile.svelte';

  import memberApi from '../../dataSources/api.that.tech/members';

  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from './_UpNext.svelte';
  import MeritBadges from './_MeritBadges.svelte';
  import Hero from './_Hero.svelte';

  metaTagsStore.set({
    title: 'Community - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/members/`,
    },
  });

  const { member } = router.params;

  const { queryMemberBySlug } = memberApi(getClient());
</script>

{#await queryMemberBySlug(member)}
  <p>loading...</p>
{:then r}
  <ProfileLayout>
    <div class="flex flex-col">
      <div in:fade="{{ delay: 200 }}">
        <Hero member="{r}" />
      </div>
      <div in:fade="{{ delay: 400 }}">
        <MeritBadges meritBadges="{r.earnedMeritBadges}" />
      </div>
      <div in:fade="{{ delay: 600 }}">
        <NewestFollowers />
      </div>
      <div in:fade="{{ delay: 800 }}">
        <UpNext communityName="Node.js" />
        <CTA communityName="Node.js" communityHandle="@nodejs" />
      </div>
    </div>
  </ProfileLayout>
{/await}
