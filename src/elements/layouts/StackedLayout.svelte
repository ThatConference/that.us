<script>
  import { Footer } from '../../components';
</script>

<div>
  <header class="bg-gray-800 pb-32">
    <slot name="header" />
  </header>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <slot name="body" />
        <!-- default slot as fallback-->
        <slot />
      </div>
      <slot name="footer" />
    </div>
  </main>

  <Footer />

</div>
