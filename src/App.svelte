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
  import FAQ from './routes/FAQ.svelte';
  import Members from './routes/Members.svelte';

  // my
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';

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

  let documentReferrer;

  function shouldRedirecToLogin() {
    documentReferrer = window.location.pathname;
    return $isAuthenticated;
  }
</script>

<main>
  <Tailwindcss />

  <Router>
    <Route exact path="/" component="{Home}" />
    <Route exact path="/login" component="{Login}" {documentReferrer} />
    <Route exact path="/logout" component="{Logout}" />
    <Route exact path="/faq" component="{FAQ}" />
    <Route exact path="/members" component="{Members}" />

    <Route exact path="/sessions" component="{List}" />

    <Route
      exact
      path="/sessions/create"
      component="{Create}"
      condition="{shouldRedirecToLogin}"
      redirect="/login"
    />

    <Route exact path="/sessions/:sessionId" component="{Session}" />

    <Route
      exact
      path="/join/:sessionId"
      component="{Live}"
      condition="{shouldRedirecToLogin}"
      redirect="/login"
    />

    <Route
      exact
      path="/my/favorites"
      component="{MyFavorites}"
      condition="{shouldRedirecToLogin}"
      redirect="/login"
    />

    <Route
      exact
      path="/my/submissions"
      component="{MySubmissions}"
      condition="{shouldRedirecToLogin}"
      redirect="/login"
    />

    <Route fallback>Page Not Found</Route>

  </Router>

</main>
