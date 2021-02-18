<script>
  import { onMount } from 'svelte';
  import { router } from 'yrv';

  import Hybrid from './components/_Hybrid.svelte';
  import Online from './components/_Online.svelte';

  let eventLayout;
  const { id, name } = $router.params;

  onMount(() => {
    eventLayout = Online;
  });
</script>

<svelte:component this="{eventLayout}" event="{id}" eventInstance="{name}" />
