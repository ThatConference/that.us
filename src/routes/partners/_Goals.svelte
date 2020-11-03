<script>
  export let goals = [];

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
              <div class="w-full h-full py-10 px-6 xl:px-10">
                <div class="h-full w-full flex flex-col space-y-4">
                  <div class="flex-grow">
                    <svg
                      class="top-0 left-0 transform -translate-x-4 translate-y-4 h-8
                      w-8 text-thatBlue-100 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                      ></path>
                    </svg>
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
