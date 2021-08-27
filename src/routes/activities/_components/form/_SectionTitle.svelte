<script>
  export let title = '';
  export let description = '';
  export let stepNumber;

  import Icon from 'svelte-awesome';
  import { stepForward } from 'svelte-awesome/icons';
</script>

<div class="pt-20 pb-2">
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300"></div>
    </div>
    <div class="relative flex items-center">
      <div class="block px-1 bg-gray-100">
        <span
          class="h-8 w-8 bg-white rounded-full flex items-center justify-center ring-4 ring-gray-300">
          <!-- <span class="text-sm text-gray-500">{stepNumber}</span> -->
          <Icon data="{stepForward}" class="text-gray-500 w-4 h-4" />
        </span>
      </div>

      <span class="px-4 bg-gray-100 text-lg font-medium text-gray-900">
        {title}
      </span>
    </div>
  </div>
  {#if description}
    <p class="px-14 py-2 text-sm text-gray-400">
      {description}
    </p>
  {/if}
</div>
