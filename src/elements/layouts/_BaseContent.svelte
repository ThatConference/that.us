<script>
  export let logoUrl;

  import { fade } from 'svelte/transition';

  import Footer from '../../components/Footer.svelte';
  import NavWrapper from './_NavWrapper.svelte';
</script>

<section class="flex flex-col min-h-screen">
  <NavWrapper />
  <main class="flex-grow overflow-hidden">
    <div class="hidden lg:block lg:inset-y-0 lg:h-full lg:w-full">
      <div
        class="invisible lg:visible"
        in:fade="{{ delay: 200, duration: 2000 }}"
      >
        <div
          class="fixed w-4/6 h-5/6 right-0 mt-40 mr-80 
          lg:bottom-4/12 lg:left-5/12 lg:mt-0 lg:mr-0"
        >
          <div class="back"></div>

          <!-- <img
          src="{logoUrl}"
          class="opacity-25 fixed w-4/6 h-5/6 right-0 mt-40 mr-80 
          lg:bottom-4/12 lg:left-5/12 lg:mt-0 lg:mr-0"
          alt="adsf"
        /> -->
        </div>
        <slot />
      </div>
    </div>
  </main>
  <Footer />
</section>

<style>
  .back {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url(/images/logos/logo-javascript.svg) top center;
    background-size: 100%;
  }
</style>
