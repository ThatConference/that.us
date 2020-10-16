<script>
  import { fade } from 'svelte/transition';

  import { Trees } from '../svgs';
  import Footer from '../../components/Footer.svelte';
  import NavWrapper from './_NavWrapper.svelte';
</script>

<section class="flex flex-col min-h-screen">
  <NavWrapper />
  <main class="flex-grow">
    <div class="hidden lg:block lg:inset-y-0 lg:h-full lg:w-full">
      <div
        class="invisible lg:visible"
        in:fade="{{ delay: 200, duration: 2000 }}"
      >
        <Trees
          classes="opacity-25 fixed w-4/6 h-5/6 right-0 mt-40 mr-80 
          lg:bottom-4/12 lg:left-5/12 lg:mt-0 lg:mr-0 text-thatBlue-100"
        />
      </div>
    </div>
    <slot />
  </main>
  <Footer />
</section>
