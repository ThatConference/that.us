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
            text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"
          >
            THAT.
            <br />
            Created By...
            <br />
            <span class="text-indigo-600">YOU!</span>
          </h2>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
            sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            On August 3rd 2020 we’re kicking off the largest Open Spaces we’ve
            ever hosted and you get to join from the comfort of your own camp
            chair. You’re in control. You make the schedule, together we learn.
            It’s a full day of virtual open spaces.
          </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <a
                href="http://tickets.thatconference.com"
                class="w-full flex items-center justify-center px-8 py-3 border
                border-transparent text-base leading-6 font-medium rounded-md
                text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                focus:border-indigo-700 focus:shadow-outline-indigo transition
                duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                Purchase Tickets
              </a>
            </div>

            {#if !$isAuthenticated}
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="/login"
                  class="w-full flex items-center justify-center px-8 py-3
                  border border-transparent text-base leading-6 font-medium
                  rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600
                  hover:bg-indigo-50 focus:outline-none
                  focus:shadow-outline-indigo focus:border-indigo-300 transition
                  duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  Log In
                </a>
              </div>
            {/if}
          </div>
        </div>
      </main>
    </div>
  </div>
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img
      class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
      data-src="https://www.thatconference.com/images/logo.that.online.jpg"
      src="https://www.thatconference.com/images/logo.that.online.jpg"
      alt=""
    />
  </div>
</div>
