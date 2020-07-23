<script>
  import { onMount } from 'svelte';
  import { initClient } from '@urql/svelte';
  import { Router, Route } from 'yrv';

  import { isAuthenticated, token } from './utilities/security.js';
  import config from './config';

  // ui components
  import Tailwindcss from './elements/Tailwindcss.svelte';

  // root
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';
  import FAQ from './routes/FAQ.svelte';
  import Partners from './routes/Partners.svelte';
  import Members from './routes/Members.svelte';

  // my
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';
  import Profile from './routes/my/Profile.svelte';

  // sessions
  import List from './routes/sessions/List.svelte';
  import Session from './routes/sessions/Session.svelte';
  import Create from './routes/sessions/Create.svelte';
  import EditSession from './routes/sessions/Edit.svelte';

  // join
  import Live from './routes/join/Live.svelte';

  initClient({
    url: config.api,
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

<svelte:head>

  <script src="//code.tidio.co/qcwuuigfzw3cjegsc2fyo0sniyh3c3ue.js" async>

  </script>
</svelte:head>

<main>
  <Tailwindcss />

  <Router>
    <Route exact path="/" component="{Home}" />
    <Route exact path="/login" component="{Login}" {documentReferrer} />
    <Route exact path="/logout" component="{Logout}" />
    <Route exact path="/faq" component="{FAQ}" />
    <Route exact path="/members" component="{Members}" />
    <Route exact path="/partners" component="{Partners}" />

    <Route exact path="/sessions" component="{List}" />

    <Route
      exact
      path="/sessions/create"
      component="{Create}"
      condition="{shouldRedirecToLogin}"
      redirect="/login"
    />

    <Route
      exact
      path="/sessions/edit/:sessionId"
      component="{EditSession}"
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

    <Route
      exact
      path="/my/profile"
      component="{Profile}"
      condition="{shouldRedirecToLogin}"
      redirect="/login"
    />

    <Route fallback>Page Not Found</Route>

  </Router>

</main>

<style global>
  .tag-form-input :global(.svelte-tags-input-tag) {
    background: #252f3f;
  }

  .sveltejs-forms .field.error input,
  .sveltejs-forms .field.error textarea {
    --text-opacity: 1;
    border: 1px solid rgba(224, 36, 36, var(--text-opacity));
  }
  .sveltejs-forms .field.error .message {
    margin-top: 0.2rem;
    font-style: italic;
    --text-opacity: 1;
    color: rgba(224, 36, 36, var(--text-opacity));
  }
</style>
