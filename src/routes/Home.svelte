<script>
  import { Footer } from '../components';
  import { Logo } from '../elements';

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

  // ui support
  import MainNav from '../components/nav/mainNav/MainNav.svelte';

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

<div class="relative z-10">
  <MainNav />
</div>

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
<Footer />
