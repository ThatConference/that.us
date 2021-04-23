<script>
  import { onMount, onDestroy } from 'svelte';
  import { getClient } from '@urql/svelte';
  import dayjs from 'dayjs';
  import Clipboard from 'clipboard';

  import { Waiting } from '../../../elements';
  import { Standard as StandardLink } from '../../../elements/links';
  import { Warning, Store, Ticket } from '../../../elements/svgs';

  import { thatProfile } from '../../../utilities/security';
  import meQueryApi from '../../../dataSources/api.that.tech/me/queries';
  import metaTagsStore from '../../../store/metaTags';

  const { queryMeDiscountCodes } = meQueryApi(getClient());

  function queryDiscountCodes() {
    return queryMeDiscountCodes();
  }

  metaTagsStore.set({
    title: 'Your Membership - THAT',
    description: 'View your membership settings.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/settings/membership`,
    },
  });

  let copiedText;
  let clipboard;

  onMount(() => {
    clipboard = new Clipboard('.discountCode');

    clipboard.on('success', function (e) {
      copiedText = 'Copied!';
    });
  });

  onDestroy(() => {
    clipboard.destroy();
  });
</script>

<div>
  <header>
    <h2 class="text-xl leading-6 font-bold text-gray-900">
      Membership Settings
    </h2>
  </header>

  {#if !$thatProfile.isMember}
    <div class="mt-8">
      <div class="flex items-center">
        <div class="mr-4">
          <Warning classes="h-12 w-12 text-red-500" />
        </div>

        <h2 class="prose-xl text-gray-500">
          Wait, our records indicate you're not a member yet. Become one today
          and save on your next visit to THAT Conference.
        </h2>
      </div>

      <div class="mt-8 flex">
        <StandardLink href="/membership/pricing">
          View Membership Options
        </StandardLink>
      </div>
    </div>
  {:else}
    <div class="mt-8">
      {#await queryDiscountCodes()}
        <Waiting />
      {:then codes}
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            {#each codes as code}
              <li class="hover:bg-gray-50 cursor-pointer">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a data-clipboard-text="{code.code}" class="discountCode">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="flex-shrink-0">
                        {#if code.type === 'TICKET'}
                          <Ticket classes="h-8 w-8 mr-3 text-green-500" />
                        {:else}
                          <Store classes="h-8 w-8 mr-3 text-green-500" />
                        {/if}
                      </div>
                      <div
                        class="min-w-0 flex-1 items-center px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p
                            class="text-md font-bold text-thatBlue-800 truncate">
                            {code.title}
                          </p>
                        </div>

                        <div class="hidden md:block">
                          <div>
                            <p class="text-sm text-gray-500">
                              Created On:
                              <time datetime="{code.createdAt}">
                                {dayjs(code.createdAt).format('MMMM D, YYYY')}
                              </time>
                            </p>
                            <p
                              class="mt-2 flex items-center text-sm font-bold text-thatOrange-400">
                              {code.code}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/await}
    </div>
  {/if}
</div>
