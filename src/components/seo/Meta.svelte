<script>
  export let title = undefined;
  export let description = undefined;

  export let noindex = false;
  export let nofollow = false;

  export let canonical = undefined;
  export let openGraph = undefined;

  import OpenGraph from './OpenGraph.svelte';
</script>

<svelte:head>
  <meta
    name="robots"
    content="{`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}"
  />
  <meta
    name="googlebot"
    content="{`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}"
  />

  {#if title}
    <title>{title}</title>
  {/if}

  {#if description}
    <meta name="description" content="{description}" />
  {/if}

  {#if openGraph}
    <OpenGraph {openGraph} {canonical} />
  {/if}
</svelte:head>
