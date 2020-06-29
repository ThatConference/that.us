<script context="module">
  import { writable } from 'svelte/store';
  const routes = {};
  // default must be an empty object otherwise we will get a null reference
  export const activeRoute = writable({});
  // register route from the Route.svelte
  export const register = route => {
    routes[route.path] = route;
  };
</script>

<script>
  import page from 'page';
  import { onMount, onDestroy } from 'svelte';
  export let disabled = false;
  export let basePath = undefined;
  // this is where we set the active componentc
  const last = route => {
    return function(ctx) {
      $activeRoute = { ...route, params: ctx.params };
    };
  };
  const setupPage = () => {
    for (let [path, route] of Object.entries(routes)) {
      page(path, ...route.middleware, last(route));
    }
    // set the base url path for our router
    if (basePath) {
      page.base(basePath);
    }
    // setup page and its click handlers
    page.start();
  };
  // wire up the router when component is mounted
  onMount(setupPage);
  // remove click event handlers when component is unmounted
  onDestroy(page.stop);
</script>

<!-- don't render anything if component is disabled -->
{#if !disabled}
  <slot />
{/if}
