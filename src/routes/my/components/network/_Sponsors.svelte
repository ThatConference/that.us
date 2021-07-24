<script>
  import { getClient } from '@urql/svelte';
  import dayjs from 'dayjs';
  import { Circle3 } from 'svelte-loading-spinners';
  import { Link } from 'yrv';

  import meNetworkQueryApi from '../../../../dataSources/api.that.tech/me/network/queries';

  import metaTagsStore from '../../../../store/metaTags';

  const { queryMySponsorNetwork } = meNetworkQueryApi(getClient());

  metaTagsStore.set({
    title: 'Your Sponsor Network - THAT',
    description: '',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/network/sponsors`,
    },
  });
</script>

<div>
  <div>
    <h2 class="text-xl leading-6 font-bold text-gray-900">
      Sponsors You've Meet
    </h2>

    <!-- <p class="mt-4 text-sm leading-5 text-gray-500">add copy here</p> -->

    <div class="px-4 py-8">
      {#await queryMySponsorNetwork()}
        <div class="flex flex-col items-center">
          <Circle3
            size="{'60'}"
            unit="{'px'}"
            ballTopLeft="#f74646"
            ballTopRight="#ff834d"
            ballBottomLeft="#26529A"
            ballBottomRight="#555555" />
        </div>
      {:then contacts}
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            {#each contacts as c}
              <li>
                <Link
                  href="/partners/{c.partner.slug}"
                  class="block hover:bg-gray-50">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="flex-shrink-0">
                        <img
                          class="h-12 w-12"
                          src="{c.partner.companyLogo}"
                          alt="" />
                      </div>
                      <div
                        class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p
                            class="text-sm font-medium text-thatBlue-800 truncate">
                            {c.partnerContact.firstName}
                            {c.partnerContact.lastName}
                          </p>
                          <p
                            class="mt-2 flex items-center text-sm text-gray-500">
                            <svg
                              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true">
                              <path
                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                              ></path>
                              <path
                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                              ></path>
                            </svg>
                            <span class="truncate"
                              >{c.partnerContact.email}</span>
                          </p>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <p class="text-sm text-gray-900">
                              <time datetime="2020-01-07"
                                >{dayjs(c.createdAt).format(
                                  'dddd, MMMM D, YYYY - h:mm A',
                                )}</time>
                            </p>
                            <p
                              class="mt-2 flex items-center text-sm text-gray-500">
                              <svg
                                class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true">
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"></path>
                              </svg>
                              Contact exchanged
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <!-- Heroicon name: solid/chevron-right -->
                      <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            {/each}
          </ul>
        </div>
      {/await}
    </div>
  </div>
</div>
