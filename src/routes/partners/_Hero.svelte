<script>
  export let partner;

  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { share } from 'svelte-awesome/icons';
  import Clipboard from 'clipboard';
  import dayjs from 'dayjs';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { Tag } from '../../elements';
  import Header from '../../elements/layouts/profile/_Header.svelte';
  import config from '../../config';
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  import { SocialLink } from '../../components/social';

  let clipboard;
  let copiedText;

  onMount(() => {
    clipboard = new Clipboard('#shareUrl');

    clipboard.on('success', function (e) {
      copiedText = 'Copied!';
    });
  });

  onDestroy(() => {
    clipboard.destroy();
  });
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-12 lg:gap-8 mb-24">
    <div
      class="max-w-2xl mx-auto flex flex-col items-center space-y-8 lg:col-span-3"
    >
      <div>
        <img
          class="mx-auto h-40 w-40 xl:w-56 xl:h-56"
          src="{partner.companyLogo}"
          alt="{partner.companyName}"
        />
      </div>
      <div>
        <h3 class="tracking-tight text-gray-500">{partner.website}</h3>
        <div class="flex justify-center space-x-2">
          {#each partner.socialLinks as link}
            <SocialLink {...link} />
          {/each}
        </div>
      </div>
    </div>
    <div class="mt-12 lg:mt-0 lg:col-start-4 lg:col-span-9">
      <div class="flex flex-col space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <Header subtitle="Partner Spotlight">{partner.companyName}</Header>
            <h3 class="font-bold tracking-tight text-gray-500">
              {`${partner.city}, ${partner.state}`}
            </h3>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              id="shareUrl"
              data-clipboard-text="{`https://that.us/partners/${partner.slug}`}"
              class="px-4 py-2 rounded-md shadow text-base leading-6 font-medium border-2
              border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
              hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
              focus:shadow-outline-thatBlue-500 focus:border-thatBlue-800 transition
              duration-150 ease-in-out md:text-lg md:px-10"
            >
              {#if copiedText}
                <span>{copiedText}</span>
              {:else}
                <Icon data="{share}" class="" />
              {/if}
            </button>

            <StandardButton class="h-3/4" on:click>Follow</StandardButton>
          </div>
        </div>

        <div>
          <p>{partner.aboutUs}</p>
        </div>

        <div class="flex flex-wrap justify-center items-center space-x-4">
          <!-- {#if member.interests}
            {#each member.interests as interest, i (i)}
              <div in:fade="{{ delay: i * 100 }}">
                <Tag>{interest}</Tag>
              </div>
            {/each}
          {/if} -->
        </div>
      </div>
    </div>
  </div>
</section>
