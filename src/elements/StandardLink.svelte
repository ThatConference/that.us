<script>
  export let href;
  export let rest;
</script>

<!-- removed the colors to allow for parent to set them... but then what's the value here?? -->
<a href="{href}" class="leading-6" {...rest}>
  <slot />
</a>
