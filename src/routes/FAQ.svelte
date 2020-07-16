<script>
  import Nav from '../components/nav/mainNav/MainNav.svelte';
  import FaqItems from '../components/faq/FaqItem.svelte';
  import { Footer } from '../components';
</script>

<div class="relative bg-white overflow-hidden">
  <div class="max-w-screen-xl mx-auto ">

    <div class="grid grid-cols-1 gap-8">
      <Nav />

      <div class="bg-gray-50">
        <div
          class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
        >
          <h2
            class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl
            sm:leading-10"
          >
            Frequently Asked Questions
          </h2>
          <FaqItems />
        </div>
      </div>
    </div>
  </div>
</div>
<Footer />
