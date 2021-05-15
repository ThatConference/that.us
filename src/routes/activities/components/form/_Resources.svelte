<script>
  export let setField;
  export let initialData;

  import TakeAways from './components/_TakeAways.svelte';
  import AdditionalResources from './components/_AdditionalResources.svelte';
</script>

<div class="px-4 sm:px-6">
  <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-6">
    <div class="sm:col-span-6">
      <label
        for="activity_full_description"
        class="block text-sm font-medium text-gray-700">
        Key Takeways
      </label>
      <div>
        <p class="mt-1 text-sm text-gray-400">
          What are some items the geek attending should come away with?
        </p>
      </div>
      <div class="mt-4">
        <TakeAways setField="{setField}" initialData="{initialData}" />
      </div>
    </div>

    <div class="sm:col-span-6">
      <label
        for="activity_full_description"
        class="block text-sm font-medium text-gray-700">
        Supporting Resources
      </label>
      <div>
        <p class="mt-1 text-sm text-gray-400">
          Here is where you can provide pointers to any applicable resources,
          your presentation, etc. You will be able to this list later.
        </p>
      </div>
      <div class="mt-4">
        <AdditionalResources
          setField="{setField}"
          initialData="{initialData}" />
      </div>
    </div>
  </div>
</div>
