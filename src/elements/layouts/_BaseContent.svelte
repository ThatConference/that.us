<script>
  import { fade } from 'svelte/transition';

  import Footer from '../../components/footer/Footer.svelte';
  import NavWrapper from './_NavWrapper.svelte';
</script>

<section class="flex flex-col min-h-screen">
  <NavWrapper />
  <main class="flex-grow">
    <div class="hidden lg:block lg:inset-y-0 lg:h-full lg:w-full">
      <div
        class="invisible lg:visible"
        in:fade="{{ delay: 200, duration: 2000 }}">
        <slot />
      </div>
    </div>
  </main>
  <Footer />
</section>
