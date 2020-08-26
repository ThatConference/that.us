<script>
  import { Footer } from '../components';

  import {
    Hero,
    Testimonials,
    CTA,
    Newsletter,
    Stats,
    Features,
    UpNext,
    // Sponsors,
  } from '../components/home';

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
  Hero
  Signup
  Demo
  Quote
  Stats
  What's up Next?
  View Past Events..
  Welcome our newest ...
-->

<Hero />

<Stats />
<Features />
<Testimonials />
<UpNext />

<Footer />
