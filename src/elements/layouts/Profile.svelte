<script>
  export let logoUrl;

  import BaseLayout from './ContentLayout.svelte';
</script>

<BaseLayout>
  <div class="py-20 overflow-hidden">
    <slot />
  </div>
</BaseLayout>
