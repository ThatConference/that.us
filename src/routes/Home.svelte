<script>
  import { Logo } from '../elements';
  import Layout from '../elements/layouts/ContentLayout.svelte';
  import {
    Hero,
    Testimonials,
    CTA,
    Newsletter,
    Stats,
    UpNext,
    Events,
    NewMembers,
  } from '../components/home';

  // utilities
  import { isAuthenticated } from '../utilities/security';
  import metaTagsStore from '../store/metaTags';

  metaTagsStore.set({
    title: 'Welcome to THAT!',
    description: 'todo',
    openGraph: {
      type: 'website',
      url: `https://that.us/`,
    },
  });
</script>

<Layout>
  <Hero />
  <Stats />
  <Testimonials />
  <Logo uri="/images/THAT-Logo-Words.svg" />
  <UpNext />

  {#if !$isAuthenticated}
    <CTA />
  {/if}

  <Events />
  <NewMembers />
  <Newsletter />
</Layout>
