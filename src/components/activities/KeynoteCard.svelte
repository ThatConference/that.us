<script>
  export let id;
  export let title;
  export let shortDescription;
  export let speakers;
  export let type;
  export let location;

  import { fade, fly } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { Link } from 'yrv';
  import { chevronDown } from 'svelte-awesome/icons';
  import { facebook, youtubePlay, twitch, signIn } from 'svelte-awesome/icons';

  import KeynoteSpeaker from './KeynoteSpeaker.svelte';
  import PanelSpeakers from './PanelSpeakers.svelte';

  let splitTitle = title.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|');
</script>

<div>
  <Link href="{`/activities/${id}`}">
    <div class="bg-thatBlue-800 rounded">
      <div class="relative z-10 rounded-lg shadow-xl">
        <div class="absolute inset-x-0 top-0 transform translate-y-px">
          <div class="flex justify-center transform -translate-y-1/2">
            <span
              class="inline-flex rounded-full bg-red-500 px-20 py-3 text-2xl
            leading-5 font-semibold tracking-wider uppercase text-white">
              Keynote
            </span>
          </div>
        </div>
      </div>

      <div class="pt-12 pb-12 px-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
        <div class="text-center">
          <p
            class="mt- text-3xl leading-9 font-extrabold text-white sm:text-2xl
          sm:leading-10 lg:text-5xl lg:leading-none">
            {#each splitTitle as line}
              <p>{line}</p>
            {/each}
          </p>
          <p
            class="lineBreaks mt-12 max-w-4xl mx-auto text-xl leading-7 text-gray-300
          sm:mt-14 sm:text-2xl sm:leading-8">
            {shortDescription}
          </p>
        </div>

        <div class="pt-8">
          {#if type === 'KEYNOTE'}
            <KeynoteSpeaker speakers="{speakers}" />
          {:else if type === 'PANEL'}
            <PanelSpeakers speakers="{speakers}" />
          {/if}

          <div
            class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 bg-gray-50 px-10 py-10">
            <div class="flex flex-col lg:flex-row items-center justify-center">
              <span
                class="flex-none text-3xl leading-none tracking-tight text-gray-900 sm:text-3xl lg:pr-4 pb-4 lg:pb-0">
                <span class="font-extrabold">
                  {#if location === 'THAT'}
                    Join In
                  {:else}
                    Watch On
                  {/if}
                </span>
              </span>

              <div
                class="flex flex-col lg:flex-row items-center justify-center">
                {#if location === 'THAT'}
                  <div class="inline-flex m-3 rounded-md shadow-md">
                    <Link
                      open
                      href="{`/join/${id}`}"
                      type="button"
                      class="relative inline-flex items-center justify-center
                      px-4 py-2 border border-gray-300 text-sm leading-5
                      font-medium rounded-md text-gray-700 bg-white
                      hover:text-red-700 focus:outline-none
                      focus:ring-red focus:border-red-300
                      active:bg-gray-50 active:text-gray-800 w-32">
                      <Icon data="{signIn}" class="-ml-1 mr-2 h-5 w-5" />
                      <span>THAT</span>
                    </Link>
                  </div>
                {:else}
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
                      active:bg-gray-50 active:text-gray-800 w-32">
                      <Icon data="{youtubePlay}" class="-ml-1 mr-2 h-5 w-5" />
                      <span>YouTube</span>
                    </Link>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></Link>
</div>
