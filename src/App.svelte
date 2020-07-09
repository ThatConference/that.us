<script>
  import { onMount } from 'svelte';
  import { initClient } from '@urql/svelte';
  import { Router, Route } from 'yrv';

  import { isAuthenticated, token } from './utilities/security.js';

  // ui components
  import Tailwindcss from './elements/Tailwindcss.svelte';

  // root
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';

  // sessions
  import List from './routes/sessions/List.svelte';
  import Session from './routes/sessions/Session.svelte';
  import Create from './routes/sessions/Create.svelte';

  // join
  import Live from './routes/join/Live.svelte';

  initClient({
    url: 'https://api.that.tech',
    fetchOptions: () => ({
      headers: { authorization: $token ? `Bearer ${$token}` : '' },
    }),
    requestPolicy: 'cache-and-network',
  });
</script>

<main>
  <Tailwindcss />

  <Router>
    <Route exact path="/" component="{Home}" />
    <Route exact path="/login" component="{Login}" />
    <Route exact path="/logout" component="{Logout}" />

    <Route exact path="/sessions" component="{List}" />

    <Route
      exact
      path="/sessions/create"
      component="{Create}"
      condition="{() => $isAuthenticated}"
      redirect="/login"
    />

    <Route exact path="/sessions/:sessionId" component="{Session}" />

    <Route
      exact
      path="/join/:sessionId"
      component="{Live}"
      condition="{() => $isAuthenticated}"
      redirect="/login"
    />

    <Route fallback>Page Not Found</Route>

  </Router>

</main>
