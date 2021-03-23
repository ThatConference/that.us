<script>
  export let title;
  export let stepNumber;
</script>

<div class="relative py-8">
  <div class="absolute inset-0 flex items-center" aria-hidden="true">
    <div class="w-full border-t border-gray-300"></div>
  </div>
  <div class="relative flex items-center">
    <div class="block px-1 bg-gray-100">
      <span
        class="h-8 w-8 bg-white rounded-full flex items-center justify-center ring-4 ring-gray-300">
        <span class="text-sm text-gray-500">{stepNumber}</span>
      </span>
    </div>

    <span class="px-3 bg-gray-100 text-lg font-medium text-gray-900">
      {title}
    </span>
  </div>
</div>
