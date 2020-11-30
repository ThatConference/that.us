<script>
  import Nav from '../nav/mainNav/MainNav.svelte';
  import { Link } from 'yrv';
</script>

<section>
  <div class="text-center">
    <h2
      class="text-4xl tracking-tight leading-10 font-extrabold text-thatBlue-800
        sm:text-5xl sm:leading-none md:text-6xl"
    >
      <span class="text-thatOrange-400">Thank You</span>
      <br class="" />
      for supporting
      <span class="text-thatOrange-400">THAT!</span>
    </h2>
    <p
      class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5
        md:text-xl md:max-w-3xl"
    >
      Since the start of THAT, it has been the continuous support from companies
      and organizations partnering with us to help create events that bring the
      community together. We thank each and every one of our partners, across
      all levels for all of our years for their amazing support! Please take a
      few minutes to learn about our partners and let them know you appreciate
      their support of our community!
    </p>
    <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
      <div class="rounded-md shadow">
        <Link
          open
          href="https://www.thatconference.com/wi/2020#tickets"
          class="w-full flex items-center justify-center px-8 py-3 border
            border-transparent text-base leading-6 font-medium rounded-md
            text-white bg-thatOrange-400 hover:bg-thatOrange-500
            focus:outline-none focus:border-thatOrange-700
            focus:ring-that-orange transition duration-150 ease-in-out
            md:py-4 md:text-lg md:px-10"
        >
          Partner Today!
        </Link>
      </div>
    </div>
  </div>
</section>
