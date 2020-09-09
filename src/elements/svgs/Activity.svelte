<script>
  import { draw } from 'svelte/transition';

  export let delay = 2000;
  export let duration = 1000;
  export let classes = 'h-8 w-8';
</script>

<svg class="{classes}" viewBox="0 0 95 66" xmlns="http://www.w3.org/2000/svg">
  <path
    in:draw="{{ delay, duration }}"
    d="M3 45.676l17.727-.032L31.073 24.34l13.95 37.862L59.777 3l13.862 47.725
    17.849.02"
    fill="none"
    stroke="currentColor"
    stroke-width="8"
  ></path>
</svg>
