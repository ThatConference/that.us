<script>
  import metaTagsStore from '../store/metaTags';

  metaTagsStore.set({
    title: 'Page Not Found - THAT',
    description: 'The page you are looking for is not at this address.',
    openGraph: {
      type: 'website',
      url: `https://that.us/not-found`,
    },
  });
</script>

<div class="container mx-auto flex flex-col">
  <img src="/images/characters/Preston@2x.png" alt="Confused Preston" />

  <div
    class="text-4xl tracking-tight leading-10 font-extrabold text-thatBlue-800
      sm:text-5xl sm:leading-none md:text-6xl"
  >
    <div class="flex items-center justify-center space-x-8">
      <div class="transform rotate-90">:(</div>
      <h2>Page Not Found</h2>
    </div>
  </div>
</div>
