<script>
  export let event;

  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { navigateTo } from 'yrv';

  import Layout from '../../../elements/layouts/LandingLayout.svelte';
  import Nav from '../../../components/nav/interiorNav/Top.svelte';
  import InProgress from './_InProgress.svelte';
</script>

<Layout>
  <section in:fade slot="nav">
    <Nav />
  </section>

  <section>
    <InProgress />
  </section>
</Layout>
