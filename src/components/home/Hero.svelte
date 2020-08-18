<script>
  import { Link } from 'yrv';
  import MainNav from '../nav/mainNav/MainNav.svelte';

  import { isAuthenticated } from '../../utilities/security.js';
</script>

<div class="relative bg-white overflow-hidden">
  <div class="max-w-screen-xl mx-auto ">
    <div
      class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl
      lg:w-full lg:pb-28 xl:pb-32"
    >
      <MainNav />

      <main
        class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16
        lg:mt-20 lg:px-8 xl:mt-28"
      >
        <div class="sm:text-center lg:text-left">
          <h2
            class="text-4xl tracking-tight leading-10 font-extrabold
            text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl"
          >
            THAT.
            <br />
            Created By...
            <br />
            <span class="text-thatOrange-400">YOU!</span>
          </h2>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
            sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            August 3rd, 2020 marks our first ever THAT Online. We’re taking a
            different approach to the "virtual conference". Our approach; create
            a platform removing artificial boundaries, a safe place where we can
            ALL collaborate in a more creative meaningful way, enabling our
            inner practitioner. Of course we can to do it anytime, anywhere, and
            any way we see fit.
          </p>

          <p
            class="mt-3 font-extrabold text-thatBlue-800 sm:mt-5 sm:text-lg
            sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            You're the Practitioner. You create the schedule!
          </p>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
            sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            Let’s say you want to have a code review, great add it to the
            schedule! Maybe you want to share your experience on the latest
            Javascript framework, do it. Do you have a question in search of
            others advice from others? Ask it. I think you're starting to get
            the idea. No topic is too small, no format is required.
          </p>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
            sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            All you need is an internet connection and a web browser.
          </p>

          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <Link
                href="/login?signup=true"
                class="w-full flex items-center justify-center px-8 py-3
                border-2 border-transparent text-base leading-6 font-medium
                rounded-md text-white bg-thatOrange-400 hover:bg-thatOrange-500
                focus:outline-none focus:border-thatOrange-700
                focus:shadow-outline-that-orange transition duration-150
                ease-in-out md:py-4 md:text-lg md:px-10"
              >
                Sign Up Today!
              </Link>
            </div>

            {#if !$isAuthenticated}
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  href="/login"
                  class="w-full flex items-center justify-center px-8 py-3
                  rounded-md text-base leading-6 font-medium border-2
                  border-thatBlue-500 text-thatBlue-500 bg-white
                  hover:bg-thatBlue-500 hover:text-white focus:bg-thatBlue-500
                  focus:text-white focus:outline-none
                  focus:shadow-outline-thatBlue-500 focus:border-thatBlue-800
                  transition duration-150 ease-in-out md:py-4 md:text-lg
                  md:px-10"
                >
                  Log In
                </Link>
              </div>
            {/if}
          </div>
        </div>
      </main>
    </div>
  </div>
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img
      class="h-56 w-full object-fit sm:h-72 md:h-96 lg:w-full lg:h-full p-24"
      src="/images/thatOnline.svg"
      alt="THAT Online"
    />
  </div>
</div>
