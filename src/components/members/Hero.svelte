<script>
  import Nav from '../nav/mainNav/MainNav.svelte';
  import { Link } from 'yrv';

  import { isAuthenticated } from '../../utilities/security';
</script>

<div class="relative bg-white overflow-hidden">
  <div class="max-w-screen-xl mx-auto">
    <div
      class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl
      lg:w-full lg:pb-28 xl:pb-32"
    >
      <Nav />

      <main
        class="mt-20 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16
        lg:mt-20 lg:px-8 xl:mt-28"
      >
        <div class="sm:text-center lg:text-left">
          <h2
            class="text-4xl tracking-tight leading-10 font-extrabold
            text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl"
          >
            Welcome to
            <br />
            <span class="text-thatOrange-400">THAT Family</span>
          </h2>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
            sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            At the heart of everything we do, you can find our THAT Community
            Members. We absolutely love our Members and welcome each and every
            one. Each Member brings a unique skill set and background that
            enriches our conversations and relationships. If you haven’t already
            signed up to become a member, we’d love it if you did!
          </p>

          {#if !$isAuthenticated}
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="rounded-md shadow">
                <Link
                  href="/login?signup=true"
                  class="w-full flex items-center justify-center px-8 py-3
                  border border-transparent text-base leading-6 font-medium
                  rounded-md text-white bg-thatOrange-400
                  hover:bg-thatOrange-500 focus:outline-none
                  focus:border-thatOrange-700 focus:shadow-outline-that-orange
                  transition duration-150 ease-in-out md:py-4 md:text-lg
                  md:px-10"
                >
                  Sign up today!
                </Link>
              </div>
            </div>
          {/if}
        </div>
      </main>
    </div>
  </div>
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img
      class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
      src="/images/ClarkJaimee.jpg"
      alt=""
    />
  </div>
</div>
