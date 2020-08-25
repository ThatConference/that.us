<script>
  import { onMount } from 'svelte';
  import { initClient } from '@urql/svelte';
  import { router, Router, Route } from 'yrv';

  import { isAuthenticated, token } from './utilities/security.js';
  import config, { events } from './config';
  import currentEvent from './store/currentEvent';
  import metaTagsStore from './store/metaTags';
  import metaTags from './utilities/seo/metaTags';

  // ui components
  import Tailwindcss from './elements/Tailwindcss.svelte';

  // root
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';
  import FAQ from './routes/FAQ.svelte';
  import Partners from './routes/Partners.svelte';
  import Members from './routes/Members.svelte';
  import Help from './routes/help/Help.svelte';

  // my
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';
  import Profile from './routes/my/Profile.svelte';
  import Badges from './routes/my/Badges.svelte';

  // sessions
  import Event from './routes/events/List.svelte';
  import List from './routes/sessions/List.svelte';
  import Session from './routes/sessions/Session.svelte';
  import Create from './routes/sessions/Create.svelte';
  import EditSession from './routes/sessions/Edit.svelte';

  // join
  import Live from './routes/join/Live.svelte';

  // setting the default event
  currentEvent.set(events.thatUs);

  initClient({
    url: config.api,
    fetchOptions: () => ({
      headers: {
        authorization: $token ? `Bearer ${$token}` : '',
        'that-site': 'that.us',
      },
    }),
    // todo.. this needs to be revisited... and when we get a new graph client.
    // requestPolicy: 'cache-and-network',
    requestPolicy: 'network-only',
  });

  let documentReferrer;

  function shouldRedirecToLogin() {
    documentReferrer = window.location.pathname;
    return $isAuthenticated;
  }

  router.subscribe(e => {
    if (!e.initial) {
      // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
      window.gtag('config', config.gtag, {
        page_path: e.path,
      });
    }
  });
</script>

<svelte:head>

  <title>{$metaTagsStore ? $metaTagsStore.title : 'Welcome to THAT'}</title>

  {#each metaTags($metaTagsStore) as tags}
    <meta {...tags} />
  {/each}

  <!-- tidio chat bot -->
  <script src="//code.tidio.co/qcwuuigfzw3cjegsc2fyo0sniyh3c3ue.js" async>

  </script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-21705613-11">

  </script>
  <!-- GA -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-21705613-11');
    // set true to disable Google Analytics
    window['ga-disable-UA-21705613-11'] = window.origin.includes('localhost');
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
    <Route exact path="/help" component="{Help}" />

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
    <Route exact path="/events/:eventName" component="{Event}" />

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

    <Route
      exact
      path="/my/badges"
      component="{Badges}"
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

  select {
    /* for Firefox */
    -moz-appearance: none;
    /* for Safari, Chrome, Opera */
    -webkit-appearance: none;
  }
</style>
