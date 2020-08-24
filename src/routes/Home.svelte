<script>
  export let router;

  import { Footer } from '../components';
  import {
    Hero,
    Testimonials,
    CTA,
    Newsletter,
    // Sponsors,
  } from '../components/home';
  import Youtube from '@sveltecasts/svelte-youtube';
  import Meta from '../components/seo/Meta.svelte';

  import SponsorSimple from '../components/SponsorSimple.svelte';
</script>

<Meta
  title="Welcome to THAT!"
  description="todo"
  openGraph="{{ title: 'Welcome to THAT!', description: 'todo', type: 'website', url: `https://that.us/` }}"
/>

<Hero />
<Testimonials />

<div class="grid grid-cols-1 gap-24 py-24">
  <div class="flex flex-grow justify-center ">
    <h2
      class="text-4xl tracking-tight leading-10 font-extrabold text-thatBlue-800
      sm:text-5xl sm:leading-none md:text-6xl"
    >
      Welcome to THAT
      <span class="text-thatOrange-400">Online!</span>
    </h2>
  </div>
  <div class="flex flex-grow justify-center">
    <Youtube videoId="cAftppcmqRE" />
  </div>

</div>
<!-- <Sponsors /> -->
<SponsorSimple />
<!-- <CTA /> -->
<!-- <Newsletter /> -->
<Footer />
