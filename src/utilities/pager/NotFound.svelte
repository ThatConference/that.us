<script>
  import { register, activeRoute } from './Router.svelte';
  // page.js catch all handler
  export let path = '*';
  export let component = null;
  // need to set empty middlware. Otherwise we get an error
  register({ path, component, middleware: [] });
</script>

{#if $activeRoute.path === path}
  <svelte:component this="{component}" />
  <slot />
{/if}
