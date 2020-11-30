<script>
  import { Link } from 'yrv';

  export let href;
  export let text;
  export let disabled = false;
</script>

<div class:disabled>
  <Link
    exact
    href="{href}"
    class="w-full flex items-center justify-center px-8 py-3 border
    border-transparent text-base leading-6 font-medium rounded-md text-white
    bg-thatOrange-400 hover:bg-thatOrange-500 focus:outline-none
    focus:border-thatOrange-700 focus:ring-that-orange transition
    duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
  >
    {text}
  </Link>
</div>
