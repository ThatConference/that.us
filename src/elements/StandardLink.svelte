<script>
  export let href;
  export let rest;
</script>

<a {href} class="text-gray-500 leading-6 hover:text-that-blue" {...rest}>
  <slot />
</a>
