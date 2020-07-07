<script>
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

{#each x as aa}
  <div>
    <div>
      <h2
        class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900
        sm:text-5xl sm:leading-none md:text-6xl p-8"
      >
        8:00 AM
      </h2>
    </div>
    <ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {#each x as xx}
        <li class="col-span-1 bg-white rounded-lg shadow">
          <div class="w-full flex items-center justify-between p-3 space-x-6">

            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <img
                  class="w-15 h-15 bg-gray-300 rounded-full flex-shrink-0"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                  alt=""
                />
                <h3
                  class="text-gray-900 text-sm leading-5 font-medium break-words"
                >
                  How to get started with Svelte asdfasd a sdfas f safda?
                </h3>
              </div>

            </div>
          </div>

          <div class="px-3">
            <p class="text-gray-500 text-sm leading-5 break-words">
              I would like some help on how can I get started with Svelte. I
              would like some help on how can I get started with Svelte.
            </p>
          </div>

          <div
            class="flex flex-wrap items-center justify-around space-x-2 px-6
            py-2"
          >
            <div class="flex-initial">
              <span
                class="inline-block px-2 py-0.5 text-teal-800 text-xs leading-4
                font-medium bg-teal-100 rounded-full"
              >
                JavaScript
              </span>
            </div>
            <div class="flex-initial">
              <span
                class="inline-block px-2 py-0.5 text-teal-800 text-xs leading-4
                font-medium bg-teal-100 rounded-full"
              >
                ReactJS
              </span>
            </div>
            <div class="flex-initial">
              <span
                class="inline-block px-2 py-0.5 text-teal-800 text-xs leading-4
                font-medium bg-teal-100 rounded-full"
              >
                Need Help
              </span>

            </div>
            <div class="flex-initial">
              <span
                class="inline-block px-2 py-0.5 text-teal-800 text-xs leading-4
                font-medium bg-teal-100 rounded-full"
              >
                Web
              </span>
            </div>

            <div class="flex-initial">
              <span
                class="inline-block px-2 py-0.5 text-teal-800 text-xs leading-4
                font-medium bg-teal-100 rounded-full"
              >
                Development
              </span>

            </div>
          </div>

          <div class="border-t border-gray-200">
            <div class="-mt-px flex">
              <div class="w-0 flex-1 flex border-r border-gray-200">
                <a
                  href="#"
                  class="relative -mr-px w-0 flex-1 inline-flex items-center
                  justify-center py-4 text-sm leading-5 text-gray-700
                  font-medium border border-transparent rounded-bl-lg
                  hover:text-gray-500 focus:outline-none
                  focus:shadow-outline-blue focus:border-blue-300 focus:z-10
                  transition ease-in-out duration-150"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0
                      00-1.997 1.884z"
                    ></path>
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    ></path>
                  </svg>
                  <span class="ml-3">More Details</span>
                </a>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <a
                  href="#"
                  class="relative w-0 flex-1 inline-flex items-center
                  justify-center py-4 text-sm leading-5 text-gray-700
                  font-medium border border-transparent rounded-br-lg
                  hover:text-gray-500 focus:outline-none
                  focus:shadow-outline-blue focus:border-blue-300 focus:z-10
                  transition ease-in-out duration-150"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0
                      01-.54 1.06l-1.548.773a11.037 11.037 0 006.105
                      6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0
                      01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    ></path>
                  </svg>
                  <span class="ml-3">Join In</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/each}
