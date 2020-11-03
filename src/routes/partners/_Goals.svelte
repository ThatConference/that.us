<script>
  export let goals;

  import { fade } from 'svelte/transition';
</script>

<section class="py-12 lg:py-16 bg-white">
  <div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
    <div class="space-y-12">
      <div
        class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none"
      >
        <h2
          class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl"
        >
          Our Goals
        </h2>
      </div>

      <div class="flex flex-col">
        <ul
          class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
        >
          {#each goals as goal}
            <li in:fade>
              <div
                class="w-full h-full py-10 px-6 bg-white shadow rounded-lg xl:px-10"
              >
                <div class="h-full w-full flex flex-col space-y-4">
                  <div class="flex-grow">
                    <p
                      class="text-sm leading-5 break-words text-center font-medium text-gray-900"
                    >
                      {goal}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>
