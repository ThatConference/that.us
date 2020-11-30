<script>
  export let partner;
  export let isFollowing = false;

  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Icon from 'svelte-awesome';
  import { share } from 'svelte-awesome/icons';
  import Clipboard from 'clipboard';
  import { Link } from 'yrv';

  import { Standard as StandardButton } from '../../elements/buttons';
  import { Standard as StandardLink } from '../../elements/links';
  import { SocialLink } from '../../components/social';
  import { isAuthenticated } from '../../utilities/security.js';

  const dispatch = createEventDispatcher();
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
  <div class="mb-24">
    <div class="flex flex-col space-y-8">
      <h1
        class="text-base leading-6 text-thatOrange-400 font-semibold tracking-wide uppercase"
      >
        PARTNER SPOTLIGHT
      </h1>
      <div class="flex justify-between">
        <div>
          <div class="transform hover:scale-110 cursor-pointer">
            <Link href="{partner.website}?utm_source=THAT">
              <img
                class="w-96"
                src="{partner.companyLogo}"
                alt="{partner.companyName}"
              />
            </Link>
          </div>

          <div class="flex flex-col py-8 font-bold text-gray-500">
            {#if partner.city && partner.state}
              <h3 class="tracking-tight">{partner.city}, {partner.state}</h3>
            {/if}

            <div class="flex space-x-2 pt-4">
              {#each partner.socialLinks as link}
                <SocialLink {...link} />
              {/each}
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-8">
          <div class="flex justify-end space-x-4">
            <button
              id="shareUrl"
              data-clipboard-text="{`https://that.us/partners/${partner.slug}`}"
              class="px-4 py-2 rounded-md shadow text-base leading-6 font-medium border-2
            border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
            hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
            focus:ring-thatBlue-500 focus:border-thatBlue-800 transition
            duration-150 ease-in-out md:text-lg md:px-10"
            >
              {#if copiedText}
                <span>{copiedText}</span>
              {:else}
                <Icon data="{share}" class="" />
              {/if}
            </button>

            <StandardLink
              class="h-3/4"
              href="{partner.website}?utm_source=THAT"
              open="{true}"
            >
              Visit Us
            </StandardLink>
            {#if $isAuthenticated}
              <StandardButton
                class="h-3/4"
                on:click="{() => dispatch('TOGGLE_FOLLOW')}"
              >
                {#if !isFollowing}Follow{:else}Un-Follow{/if}
              </StandardButton>
            {/if}
          </div>
        </div>
      </div>

      <div class="leading-8 text-lg font-medium text-gray-900">
        <p class="lineBreaks">{partner.aboutUs || ''}</p>
      </div>
    </div>
  </div>
</section>
