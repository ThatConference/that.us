<script>
  export let title = '';
</script>

<header class="py-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between">
      <h1 class="text-3xl leading-9 font-bold text-white">
        <slot name="title">{title}</slot>
      </h1>
      <span class="inline-flex rounded-md shadow-sm">
        <slot />
      </span>
    </div>
  </div>
</header>
