<script>
  export let title;
  export let subTitle;
  export let checked = false;
</script>

<div class="flex items-center">
  <button
    type="button"
    class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thatBlue-500"
    class:bg-thatBlue-500="{checked}"
    class:bg-gray-200="{!checked}"
    on:click|preventDefault="{() => (checked = !checked)}">
    <span
      aria-hidden="true"
      class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
      class:translate-x-5="{checked}"
      class:translate-x-0="{!checked}"></span>
  </button>
  <span class="ml-3" id="annual-billing-label">
    <span class="text-sm font-medium text-gray-900">{title}</span>
    <span class="text-sm text-gray-500">({subTitle})</span>
  </span>
</div>
