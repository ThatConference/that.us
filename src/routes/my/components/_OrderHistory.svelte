<script>
  import { getClient } from '@urql/svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { useMachine } from 'xstate-svelte';
  import dayjs from 'dayjs';

  import { debug } from '../../../config';
  import createMachine from '../machines/orderHistory';
  import { Ticket, ChevronRight, Chevron } from '../../../elements/svgs';
  import { Waiting } from '../../../elements';
  import orderQueryApi from '../../../dataSources/api.that.tech/orders/queries';
  import metaTagsStore from '../../../store/metaTags';

  const { queryOrderReceiptUrl } = orderQueryApi(getClient());

  const { state, send } = useMachine(createMachine(), {
    devTools: debug.xstate,
  });

  function handleNext() {
    console.log('handleNext called');
    send('NEXT');
  }

  function handleReceiptRedirect(orderId) {
    return queryOrderReceiptUrl(orderId).then(r => {
      window.open(r);
    });
  }

  metaTagsStore.set({
    title: 'Order History',
    description: 'View your order history.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/settings/order-history`,
    },
  });
</script>

<div>
  <header>
    <h2 class="text-xl leading-6 font-bold text-gray-900">Order History</h2>

    <p class="mt-4 text-sm leading-5 text-gray-500">
      Bacon ipsum dolor amet meatloaf tongue pork belly filet mignon ground
      round boudin meatball swine pork.
    </p>
  </header>

  {#if ['init'].some($state.matches)}
    <div class="mt-8 w-full flex flex-col items-center justify-center">
      <Waiting />
    </div>
  {/if}

  <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      {#each $state.context.items as c (c.id)}
        <li>
          <button
            on:click="{() => handleReceiptRedirect(c.id)}"
            class="block hover:bg-gray-50"
          >
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <!-- image -->
                <div class="flex-shrink-0">
                  <Ticket classes="{'text-thatBlue-500 h-8 w-8'}" />
                </div>

                <div
                  class="min-w-0 flex-1 items-center px-4 md:grid md:grid-cols-2 md:gap-4"
                >
                  <div>
                    <p class="text-lg font-medium text-gray-500 truncate">
                      {c.id}
                    </p>
                  </div>

                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900">
                        Purchased on
                        <time datetime="2020-01-07"
                          >{dayjs(c.orderDate).format(
                            'dddd MMMM D, YYYY - h:mm A',
                          )}</time
                        >
                      </p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"></path>
                        </svg>
                        ${parseFloat(c.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          </button>
        </li>
      {/each}

      <SvelteInfiniteScroll
        window
        threshold="{100}"
        on:loadMore="{handleNext}"
      />
    </ul>
  </div>

  {#if ['loaded'].some($state.matches)}
    <div class="mt-12 text-gray-400 flex flex-col items-center">
      scroll for more <Chevron />
    </div>
  {/if}

  {#if ['loadingNext', 'loadedAll'].some($state.matches)}
    <div class="flex flex-grow justify-center py-12">
      <Waiting />
    </div>
  {/if}
</div>
