<script>
  import Nav from '../nav/mainNav/MainNav.svelte';
  import { Link } from 'yrv';
</script>

<div class="relative bg-white overflow-hidden">
  <div class="max-w-screen-xl mx-auto">
    <div
      class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl
      lg:w-full lg:pb-28 xl:pb-32"
    >
      <Nav />

      <main
        class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16
        lg:mt-20 lg:px-8 xl:mt-28"
      >
        <div class="sm:text-center lg:text-left">
          <h2
            class="text-4xl tracking-tight leading-10 font-extrabold
            text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"
          >
            Welcome to
            <br />
            <span class="text-indigo-600">THAT Family</span>
          </h2>
          <p
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
            sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            Need some awesome text ehre...
          </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <Link
                href="/login"
                class="w-full flex items-center justify-center px-8 py-3 border
                border-transparent text-base leading-6 font-medium rounded-md
                text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                focus:border-indigo-700 focus:shadow-outline-indigo transition
                duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                Sign up today!
              </Link>
            </div>
          </div>
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
