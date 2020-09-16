<script>
  import Footer from '../../components/Footer.svelte';
  import NavWrapper from './NavWrapper.svelte';
</script>

<section>
  <NavWrapper />
  <main>
    <slot />
  </main>
  <Footer />
</section>
