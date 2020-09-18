<script>
  export let href;

  import { Link } from 'yrv';
</script>

<Link
  href="{href}"
  class="px-8 py-3 border-2 border-transparent leading-6 font-medium rounded-md
    shadow md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out
    text-base text-white bg-thatOrange-400 hover:bg-thatOrange-500
    focus:outline-none focus:border-thatOrange-700
    focus:shadow-outline-that-orange"
>
  <span>
    <slot />
  </span>
</Link>
