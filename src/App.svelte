<script>
  import { initClient } from '@urql/svelte';
  import { Link, Router, Route } from 'yrv';

  import Tailwindcss from './elements/Tailwindcss.svelte';
  import List from './views/session/List.svelte';
  import Create from './views/session/Create.svelte';
  import Login from './views/Login.svelte';

  import { auth0Promise, isAuthenticated } from './utilities/security.js';

  $: disabled = !$isAuthenticated;

  initClient({ url: 'http://localhost:9090/graphql' });
</script>

<main>
  <Tailwindcss />

  <Router path="/">
    <Route exact path="/" component="{List}" />
    <Route exact path="/login" component="{Login}" />
  </Router>

  <Router path="/sessions">
    {#await auth0Promise then auth}
      {(console.log($isAuthenticated), '')}
      {#if !$isAuthenticated}
        <Route exact redirect="/login">welcome back</Route>
      {:else}
        <Route exact component="{List}" />
        <Route exact path="/create" component="{Create}" />
      {/if}
    {/await}
    <Route fallback>
      <h2>404 Not Found</h2>
      <p>Sorry, page not found</p>
    </Route>

  </Router>

</main>
