<script>
  export let href;
  export let rest;
</script>

<a
  {href}
  {...rest}
  class="text-gray-500 cursor-pointer leading-6 hover:text-that-blue"
>
  <slot />
</a>
