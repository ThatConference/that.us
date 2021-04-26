<script>
  export let href;

  import { scrollto } from 'svelte-scrollto';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore missing-declaration -->
<div class="flex">
  <a
    use:scrollto="{href}"
    class="flex-grow px-4 py-2 
      rounded-md shadow text-base leading-6 font-medium md:text-lg border-2  
      bg-white  
      border-thatBlue-500 text-thatBlue-500 
      hover:bg-thatBlue-500 hover:text-white 
      focus:bg-thatBlue-500 focus:text-white focus:outline-none focus:ring-thatBlue-500 focus:border-thatBlue-800 
      transition duration-150 ease-in-out">
    <span>
      <slot />
    </span>
  </a>
</div>
