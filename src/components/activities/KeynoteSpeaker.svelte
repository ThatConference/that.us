<script>
  export let speakers;

  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';
  import { facebook, youtubePlay, twitch } from 'svelte-awesome/icons';
  import config from '../../config';

  let [host] = speakers;
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

  let userProfileImage = host.profileImage
    ? `${host.profileImage}${imageCrop}`
    : config.defaultProfileImage;
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
                <div>
                  <div
                    class="text-center text-3xl leading-9 font-semibold
                    text-gray-900 sm:-mx-6"
                  >
                    <Link
                      href="/members/{host.profileSlug}"
                      class="flex-shrink-0"
                    >
                      <span class="inline-block relative">
                        <img
                          class="w-48 h-48 rounded-full"
                          src="{userProfileImage}"
                          alt="{`${host.firstName} ${host.lastName}`}"
                        />

                        {#if host.earnedMeritBadges.length > 0}
                          <span
                            class="absolute bottom-0 left-0 block h-20 w-20"
                          >
                            <img
                              src="{host.earnedMeritBadges[0].image}"
                              alt="{host.earnedMeritBadges[0].name}"
                            />
                          </span>
                        {/if}
                      </span>
                    </Link>
                  </div>

                  <div class="mt-4 flex flex-col items-center justify-center">
                    <span
                      class="text-3xl leading-9 font-extrabold text-gray-900
                      sm:text-2xl sm:leading-10 lg:text-5xl lg:leading-none"
                    >
                      <span>{`${host.firstName} ${host.lastName}`}</span>
                    </span>

                    <span
                      class="py-3 text-xl leading-none tracking-tight
                      text-gray-500 sm:text-xl"
                    >
                      <span>{`${host.jobTitle} @ ${host.company}`}</span>
                    </span>
                    <span
                      class="py-3 text-xl leading-none tracking-tight
                      text-gray-500 sm:text-xl"
                    >
                      <p
                        class="ml-3 text-base leading-6 font-medium
                        text-gray-500 text-center"
                      >
                        {host.bio}
                      </p>
                    </span>
                  </div>
                </div>
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
