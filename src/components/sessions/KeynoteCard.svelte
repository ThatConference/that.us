<script>
  export let title;
  export let shortDescription;
  export let speakers;
  export let type;

  import { fade, fly } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { chevronDown } from 'svelte-awesome/icons';
  import KeynoteSpeaker from './KeynoteSpeaker.svelte';
  import PanelSpeakers from './PanelSpeakers.svelte';

  let splitTitle = title.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|');
  let showMore = false;
</script>

<div
  on:click|preventDefault="{() => (showMore = !showMore)}"
  class="border-none, cursor-pointer"
>
  <div class="bg-thatBlue-800 rounded">
    <div class="relative z-10 rounded-lg shadow-xl">
      <div class="absolute inset-x-0 top-0 transform translate-y-px">
        <div class="flex justify-center transform -translate-y-1/2">
          <span
            class="inline-flex rounded-full bg-red-500 px-20 py-3 text-2xl
            leading-5 font-semibold tracking-wider uppercase text-white"
          >
            Keynote
          </span>
        </div>
      </div>
    </div>

    <div class="pt-12 pb-12 px-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">

      <div class="text-center">
        <p
          class="mt- text-3xl leading-9 font-extrabold text-white sm:text-2xl
          sm:leading-10 lg:text-5xl lg:leading-none"
        >
          {#each splitTitle as line}
            <p>{line}</p>
          {/each}
        </p>
        <p
          class="mt-12 max-w-4xl mx-auto text-xl leading-7 text-gray-300
          sm:mt-14 sm:text-2xl sm:leading-8"
        >
          {shortDescription}
        </p>
      </div>

      {#if !showMore}
        <div
          transition:fade="{{ duration: 1000 }}"
          class="pt-12 text-white text-center"
        >
          <Icon data="{chevronDown}" class="h-10 w-10" />
        </div>
      {/if}
    </div>

    {#if showMore}
      <div transition:fly="{{ y: 100, duration: 1000 }}">
        {#if type === 'KEYNOTE'}
          <KeynoteSpeaker {speakers} />
        {:else if type === 'PANEL'}
          <PanelSpeakers {speakers} />
        {/if}
      </div>
    {/if}
  </div>

</div>
