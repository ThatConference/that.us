<script>
  export let logoUrl;

  import BaseLayout from './ContentLayout.svelte';
</script>

<BaseLayout>
  <div class="py-20 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </div>
</BaseLayout>
