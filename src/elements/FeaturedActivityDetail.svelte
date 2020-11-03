<script>
  export let id;
  export let title;
  export let shortDescription;
  export let startTime;

  import Icon from 'svelte-awesome';
  import { caretDown } from 'svelte-awesome/icons';
  import { Link } from 'yrv';
  import dayjs from 'dayjs';

  import { truncate, isLongerThan } from '../utilities/truncate';

  let expandDescription = false;
</script>

<Link href="/activities/{id}">
  <div
    class="transform hover:scale-110 w-full h-full py-10 px-6 hover:bg-thatBlue-400 bg-that-blue
      shadow rounded-lg xl:px-10 text-left"
  >
    <div class="h-full w-full text-white flex flex-col space-y-4">
      <h1 class="text-lg font-semibold tracking-tight">{title}</h1>

      <div
        class="flex-grow"
        class:cursor-pointer="{isLongerThan(shortDescription, 25)}"
        on:click|preventDefault|stopPropagation="{() => (expandDescription = !expandDescription)}"
      >
        <p class="text-sm leading-5 break-words">
          {#if expandDescription}
            <span class="lineBreaks">{shortDescription}</span>
          {:else}
            <div
              class:hover:text-gray-300="{isLongerThan(shortDescription, 25)}"
            >
              <span>{truncate(shortDescription, 25)}</span>
              {#if isLongerThan(shortDescription, 25)}
                <Icon data="{caretDown}" class="ml-2" />
              {/if}
            </div>
          {/if}
        </p>
      </div>

      <p class="text-thatBlue-200 text-sm italic">
        {dayjs(startTime).format('dddd MMMM D, YYYY - h:mm A')}
      </p>
    </div>
  </div>
</Link>
