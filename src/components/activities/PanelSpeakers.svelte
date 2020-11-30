<script>
  export let speakers = [];

  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';
  import { facebook, youtubePlay, twitch } from 'svelte-awesome/icons';
  import PanelSpeakerCard from './PanelSpeakerCard.svelte';

  let displayedSpeakers = speakers.filter(s => s);
</script>

<div>
  <div class="bg-white pb-12 lg:pb-20">
    <div class="relative z-0">
      <div class="absolute inset-0 h-5/6 bg-thatBlue-800 lg:h-2/3"></div>
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative lg:grid lg:grid-cols-7">
          <div
            class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0
            lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:row-end-4"
          >
            <div class="relative z-10 rounded-lg shadow-xl">
              <div
                class="pointer-events-none absolute inset-0 rounded-lg"
              ></div>
              <div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
                <ul
                  class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2
                  lg:grid-cols-3"
                >
                  {#each displayedSpeakers as speaker (speaker.id)}
                    <li class="col-span-1">
                      <PanelSpeakerCard speaker="{speaker}" />
                    </li>
                  {/each}
                </ul>
              </div>

              <div
                class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8
                bg-gray-50 px-10 py-10"
              >
                <div
                  class="flex flex-col lg:flex-row items-center justify-center"
                >
                  <span
                    class="flex-none text-3xl leading-none tracking-tight
                    text-gray-900 sm:text-3xl lg:pr-4 pb-4 lg:pb-0"
                  >
                    <span class="font-extrabold">Watch On</span>
                  </span>

                  <div
                    class="flex flex-col lg:flex-row items-center justify-center"
                  >
                    <div class="inline-flex m-3 rounded-md shadow-md">
                      <Link
                        open
                        href="https://youtube.com/c/thatconference"
                        type="button"
                        class="relative inline-flex items-center justify-center
                        px-4 py-2 border border-gray-300 text-sm leading-5
                        font-medium rounded-md text-gray-700 bg-white
                        hover:text-red-700 focus:outline-none
                        focus:ring-red focus:border-red-300
                        active:bg-gray-50 active:text-gray-800 w-32"
                      >
                        <Icon data="{youtubePlay}" class="-ml-1 mr-2 h-5 w-5" />
                        <span>YouTube</span>
                      </Link>
                    </div>

                    <div class="inline-flex m-3 rounded-md shadow-md">
                      <Link
                        open
                        href="https://facebook.com/thatconference"
                        type="button"
                        class="relative inline-flex items-center justify-center
                        px-4 py-2 border border-gray-300 text-sm leading-5
                        font-medium rounded-md text-gray-700 bg-white
                        hover:text-blue-700 focus:outline-none
                        focus:ring-blue focus:border-blue-300
                        active:bg-gray-50 active:text-gray-800 w-32"
                      >
                        <Icon data="{facebook}" class="-ml-1 mr-2 h-5 w-5" />
                        <span>Facebook</span>
                      </Link>
                    </div>

                    <div class="inline-flex m-3 rounded-md shadow-md">
                      <Link
                        open
                        href="https://twitch.com/thatconference"
                        type="button"
                        class="relative inline-flex items-center justify-center
                        px-4 py-2 border border-gray-300 text-sm leading-5
                        font-medium rounded-md text-gray-700 bg-white
                        hover:text-indigo-700 focus:outline-none
                        focus:ring-indigo focus:border-indigo-300
                        active:bg-gray-50 active:text-gray-800 w-32"
                      >
                        <Icon data="{twitch}" class="-ml-1 mr-2 h-5 w-5" />
                        <span>Twitch</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
