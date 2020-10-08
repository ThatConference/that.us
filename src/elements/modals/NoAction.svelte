<script>
  import { fade } from 'svelte/transition';
  import Waiting from '../Waiting.svelte';

  export let title;
  export let text;
</script>

<div
  class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex
  sm:items-center sm:justify-center"
>
  <div class="fixed inset-0 transition-opacity">
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
  </div>

  <div
    class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl
    transform transition-all sm:max-w-sm sm:w-full sm:p-6"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    transition:fade="{{ duration: 1000 }}"
  >
    <div>
      <div class="mx-auto flex items-center justify-center">
        <Waiting />
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3
          class="text-lg leading-6 font-medium text-gray-900"
          id="modal-headline"
        >
          {title}
        </h3>
        <div class="mt-2">
          <p class="text-sm leading-5 text-gray-500">{text}</p>
        </div>
      </div>
    </div>
  </div>
</div>
