<script>
  import { Footer } from '../../components';
  import MainNav from '../../components/nav/mainNav/MainNav.svelte';
</script>

<main>
  <div class="max-w-screen-xl mx-auto">
    <nav>
      <MainNav />
    </nav>
    <section class="pt-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </section>
  </div>
  <Footer />
</main>
