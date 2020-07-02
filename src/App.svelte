<script>
  import { initClient } from '@urql/svelte';
  import { Router, Route } from 'svelte-routing';

  import Tailwindcss from './elements/Tailwindcss.svelte';
  import List from './routes/session/List.svelte';
  import Create from './routes/session/Create.svelte';
  import Login from './routes/Login.svelte';
  import WAT from './routes/WAT.svelte';

  // import { isAuthenticated } from './utilities/security.js';

  initClient({ url: 'http://localhost:9090/graphql' });
</script>

<main>
  <Tailwindcss />

  <Router>
    <Route path="/" component="{List}" />
    <Route path="/login" component="{Login}" />
    <Route path="/wat/*" component="{WAT}" />

    <!-- {#if $isAuthenticated} -->
    <Route path="sessions/" component="{List}" />
    <Route path="/sessions/create" component="{Create}" />
    <!-- {/if} -->

  </Router>

</main>
