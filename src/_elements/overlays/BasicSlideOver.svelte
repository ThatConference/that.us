<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<div
  class="z-50 fixed inset-0 overflow-hidden"
  on:click|stopPropagation="{() => {
    dispatch('clicked-outside', 'clicked');
  }}"
>
  <div class="absolute inset-0 overflow-hidden">
    <section
      in:fly="{{ x: 400, duration: 500 }}"
      out:fly="{{ x: 400, duration: 500 }}"
      class="absolute inset-y-0 right-0 max-w-full flex"
      on:click|stopPropagation="{() => {}}"
    >
      <div class="w-screen md:w-auto border-l-4 border-thatOrange-400">
        <div class="h-full divide-y divide-gray-200 flex flex-col bg-white ">
          <div
            class="min-h-0 flex-1 flex flex-col py-6 space-y-6 overflow-y-scroll overscroll-none"
          >
            <header class="px-4 sm:px-6">
              <div class="flex items-start justify-between space-x-3">
                <slot name="header" />
                <div class="h-7 flex items-center">
                  <button
                    on:click|stopPropagation
                    aria-label="Close panel"
                    class="text-gray-400 hover:text-gray-500 transition
                    ease-in-out duration-150"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            <div class="flex-1 px-4 sm:px-6">
              <div class="h-full">
                <slot />
              </div>
            </div>
          </div>

          <div class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <slot name="panelActions" />
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
