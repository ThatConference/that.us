<script>
  export let router;
  import { fade } from 'svelte/transition';

  import metaTagsStore from '../../store/metaTags';
  import ProfileLayout from '../../elements/layouts/Profile.svelte';

  import NewestFollowers from './_NewestFollowers.svelte';
  import CTA from './_CTA.svelte';
  import UpNext from './_UpNext.svelte';
  import Hero from './_Hero.svelte';

  metaTagsStore.set({
    title: 'Community - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/members/`,
    },
  });

  const { community } = router.params;
</script>

<ProfileLayout>
  <div class="flex flex-col">
    <div in:fade="{{ delay: 200 }}">
      <Hero />
    </div>
    <div in:fade="{{ delay: 400 }}">
      <NewestFollowers />
    </div>
    <div in:fade="{{ delay: 600 }}">
      <UpNext communityName="Node.js" />
    </div>
    <div in:fade="{{ delay: 800 }}">
      <CTA communityName="Node.js" communityHandle="@nodejs" />
    </div>
  </div>
</ProfileLayout>
