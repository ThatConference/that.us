<script>
  import { fly } from 'svelte/transition';
  import { Link } from 'yrv';
  import Youtube from '@sveltecasts/svelte-youtube';

  // utilities
  import { isAuthenticated } from '../../utilities/security';
</script>

<section class="relative bg-white overflow-x-hidden">
  <div class="hidden lg:block lg:absolute lg:inset-0">
    <svg
      in:fly="{{ y: -400, duration: 3000 }}"
      class="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
      width="640"
      height="784"
      fill="none"
      viewBox="0 0 640 784"
    >
      <rect
        y="72"
        width="640"
        height="640"
        class="text-that-offWhite"
        fill="currentColor"
      ></rect>

    </svg>
    <svg
      in:fly="{{ y: 200, duration: 3000 }}"
      class="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
      width="640"
      height="784"
      fill="none"
      viewBox="0 0 640 784"
    >
      <defs>
        <pattern
          id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
          x="118"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-thatBlue-100"
            fill="currentColor"
          ></rect>
        </pattern>
      </defs>
      <rect
        x="118"
        width="404"
        height="784"
        fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
      ></rect>
    </svg>
  </div>

  <div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">

    <main
      class="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20
      xl:mt-24"
    >
      <h2
        class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight leading-10 font-extrabold
        text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl"
      >
        Where
        <span class="text-thatOrange-400">Geeks</span> Connect
      </h2>

      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div
          class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6
          lg:text-left"
        >
          <!-- hero copy -->
          <div>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
              sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              It's our mission to make the best community of geeks on this planet. A community of people who want to help one another each and every day. 
            </p>

            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
              sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Our jobs are complex, our industry moves fast, but we’re also privileged to be able to work with people all over the globe, but we’ve been missing something.
            </p>
          </div>
        </div>

        <div
          class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6
          lg:text-left"
        >
          <!-- action buttons -->
          <div class="mt-5 sm:mt-8 sm:flex flex-col space-y-4 sm:justify-center lg:justify-start">
            <p
              class="mt-3 font-extrabold text-thatBlue-800 sm:mt-5 sm:text-lg
              sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              All you need is an internet connection and a web browser.
            </p>

            <div class="flex space-x-4">
              {#if !$isAuthenticated}
                <Link
                  href="/login?signup=true"
                  class="px-8 py-3 border-2 border-transparent text-base
                  leading-6 font-medium rounded-md shadow text-white
                  bg-thatOrange-400 hover:bg-thatOrange-500 focus:outline-none
                  focus:border-thatOrange-700 focus:shadow-outline-that-orange
                  transition duration-150 ease-in-out md:py-4 md:text-lg
                  md:px-10"
                >
                  Become a member today!
                </Link>

                <Link
                  href="/login"
                  class="px-8 py-3 rounded-md shadow text-base leading-6
                  font-medium border-2 border-thatBlue-500 text-thatBlue-500
                  bg-white hover:bg-thatBlue-500 hover:text-white
                  focus:bg-thatBlue-500 focus:text-white focus:outline-none
                  focus:shadow-outline-thatBlue-500 focus:border-thatBlue-800
                  transition duration-150 ease-in-out md:py-4 md:text-lg
                  md:px-10"
                >
                  Already one, log in.
                </Link>
              {:else}
                <Link
                  href="/sessions"
                  class="px-8 py-3 rounded-md shadow text-base leading-6
                  font-medium border-2 border-thatBlue-500 text-thatBlue-500
                  bg-white hover:bg-thatBlue-500 hover:text-white
                  focus:bg-thatBlue-500 focus:text-white focus:outline-none
                  focus:shadow-outline-thatBlue-500 focus:border-thatBlue-800
                  transition duration-150 ease-in-out md:py-4 md:text-lg
                  md:px-10"
                >
                  View THAT Board
                </Link>
              {/if}
            </div>
          </div>
        </div>
      </div>


      <div class="mt-12">
        <h2
          class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight leading-10 font-extrabold
          text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl"
        >
          Do more than copy code.
        </h2>

        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div
            class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6
            lg:text-left"
          >
            <div
              class="mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none
              lg:mx-0 lg:flex lg:items-center"
            >
              <div class="flex flex-col items-center">
                <Youtube width="{426}" height="{240}" videoId="cAftppcmqRE" />
              </div> 
            </div>
          </div>
          <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
              sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Nothing will ever replace having a conversation where people can deeply engage and explore a topic. A safe place where questions can be asked without judgement or bias. Conferences and user groups have traditionally help to fill that gap but they leave a huge gap the rest of the year.
            </p>

            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
              sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              This is where THAT comes in. It’s our mission to connect you  and give you the safe place to have a conversation each and every day.  Let’s say you want to have a code review or a design review, great. Maybe you want to share your experience with the latest Javascript framework or seek some geek parenting advice. There are no limits, there are no artificial boundaries. Just people helping people be awesome.
            </p>
          </div>
        </div>
      </div>


    </main>
  </div>
</section>
