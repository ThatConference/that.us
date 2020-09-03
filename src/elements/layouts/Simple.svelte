<script>
  import { Footer } from '../../components';
  import MainNav from '../../components/nav/mainNav/MainNav.svelte';

  import metaTagsStore from '../../store/metaTags';
  metaTagsStore.set({
    title: 'Welcome to THAT!',
    description: 'todo',
    openGraph: {
      type: 'website',
      url: `https://that.us/`,
    },
  });
</script>

<main>
  <div class="max-w-screen-xl mx-auto">
    <nav>
      <MainNav />
    </nav>
    <section>
      <slot />
    </section>
  </div>
  <Footer />
</main>
