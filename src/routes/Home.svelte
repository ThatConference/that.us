<script>
  import { Footer } from '../components';
  import { Logo } from '../elements';

  import {
    Hero,
    Testimonials,
    CTA,
    Newsletter,
    Stats,
    Features,
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

<!--
  * Hero
    ^^ Signup
  Stats
  Features / Demo
  Quote
  What's up Next?
  
  View Past Events..
  Welcome our newest ...
  Newsletter?
-->

<div class="max-w-screen-xl mx-auto">
  <MainNav />
</div>

<Hero />
<Stats />
<Features />
<Testimonials />

<div class="py-12 lg:py-20">
  <Logo uri="/images/THAT-Logo-Words.svg" />
</div>

<UpNext />

{#if !$isAuthenticated}
  <CTA />
{/if}

<Events />
<NewMembers />
<Newsletter />
<Footer />
