<script>
  export let href;
  export let reload = false;
  export let open = false;

  import { Link } from 'yrv';
</script>

<Link
  button="{true}"
  reload="{reload}"
  open="{open}"
  href="{href}"
  class="px-8 py-2 rounded-md shadow text-base leading-6 font-medium border-2
    border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
    hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
    focus:ring-thatBlue-500 focus:border-thatBlue-800 transition
    duration-150 ease-in-out md:text-lg md:px-10"
>
  <span>
    <slot />
  </span>
</Link>
