<script>
  import { Link } from 'yrv';
  import { login } from '../../utilities/security';
</script>

<section class="py-12 lg:py-16 bg-that-offWhite">
  <div
    class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex
      lg:items-center lg:justify-between"
  >
    <h2
      class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900
        sm:text-4xl sm:leading-10"
    >
      Are you ready to expand your network?
      <br />
      <span class="text-that-orange">Become a member today, it's free.</span>
    </h2>
    <div class="mt-8 flex lg:flex-shrink-0 lg:mt-0">
      <div class="inline-flex rounded-md shadow">
        <button
          on:click="{() => login(document.location.pathname, true)}"
          class="px-8 py-3 border-2 border-transparent text-base leading-6
            font-medium rounded-md shadow text-white bg-thatOrange-400
            hover:bg-thatOrange-500 focus:outline-none
            focus:border-thatOrange-700 focus:ring-that-orange
            transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
        >
          Join today!
        </button>
      </div>
      <div class="ml-3 inline-flex rounded-md shadow">
        <Link
          href="/activities"
          class="px-8 py-3 rounded-md shadow text-base leading-6 font-medium
            border-2 border-thatBlue-500 text-thatBlue-500 bg-white
            hover:bg-thatBlue-500 hover:text-white focus:bg-thatBlue-500
            focus:text-white focus:outline-none
            focus:ring-thatBlue-500 focus:border-thatBlue-800
            transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
        >
          Upcoming Activities
        </Link>
      </div>
    </div>
  </div>
</section>
