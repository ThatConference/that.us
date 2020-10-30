<script>
  import { onMount, onDestroy } from 'svelte';
  import { initClient } from '@urql/svelte';
  import { router, Router, Route } from 'yrv';
  import { v4 as uuidv4 } from 'uuid';

  import {
    isAuthenticated,
    token,
    thatProfile,
    setupAuth,
  } from './utilities/security.js';

  import config, { events } from './config';
  import currentEvent from './store/currentEvent';
  import metaTagsStore from './store/metaTags';
  import { showReleaseNotes } from './store/siteVersion';
  import { messages } from './store/notificationCenter';
  import metaTags from './utilities/seo/metaTags';

  // ui components
  import Tailwindcss from './elements/Tailwindcss.svelte';

  // root
  import Home from './routes/home/Home.svelte';
  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';
  import FAQ from './routes/support/FAQ.svelte';
  import Partners from './routes/partners/Partners.svelte';
  import Partner from './routes/partners/Partner.svelte';
  import Members from './routes/members/Members.svelte';
  import Member from './routes/members/Member.svelte';
  import NotFound from './routes/NotFound.svelte';

  // support
  import NewUserWelcome from './routes/support/Welcome.svelte';
  import WhatIsAnActivity from './routes/support/WhatIsAnActivity.svelte';
  import JoiningAnActivity from './routes/support/JoiningAnActivity.svelte';
  import CreateAnActivity from './routes/support/CreateAnActivity.svelte';
  import StayingUpToDate from './routes/support/StayingUpToDate.svelte';

  // my
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';
  import Profile from './routes/my/Profile.svelte';
  import Badges from './routes/my/Badges.svelte';

  // Activities
  import Event from './routes/events/List.svelte';
  import List from './routes/activities/List.svelte';
  import Activity from './routes/activities/Activity.svelte';
  import Create from './routes/activities/Create.svelte';
  import EditActivity from './routes/activities/Edit.svelte';
  import SessionRedirect from './routes/SessionRedirect.svelte';

  // Communities
  import Community from './routes/communities/Community.svelte';
  import Communities from './routes/communities/Communities.svelte';

  import ChangeLog from './routes/releases/ChangeLog.svelte';
  import ChangeLogMissed from './routes/releases/Missed.svelte';

  // join
  import Live from './routes/join/Live.svelte';

  router.subscribe(() => {
    window.scrollTo(0, 0);
  });

  // setting the default event
  currentEvent.set(events.thatUs);

  let client = initClient({
    url: config.api,
    fetchOptions: () => ({
      headers: {
        authorization: $token ? `Bearer ${$token}` : '',
        'that-site': 'that.us',
        'that-correlation-id': uuidv4(),
      },
    }),
    // todo.. this needs to be revisited... and when we get a new graph client.
    // requestPolicy: 'cache-and-network',
    requestPolicy: 'network-only',
  });

  let documentReferrer;
  function isLoggedIn() {
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

  let unsub;
  onMount(() => {
    setupAuth(client);

    if ($showReleaseNotes) {
      messages.update(m => [
        ...m,
        {
          message:
            '🙌 We shipped again! 🎉 Check out newest features on THAT.us!!!',
          url: '/changelog-missed',
        },
      ]);
    }
  });

  onDestroy(unsub);

  function onTidioChatApiReady() {
    /*
      resets the z-index of the tidio iframe such that it's under warnings.
      ... we might have to set it better based on some other layering going on in places.
    */
    document.getElementById('tidio-chat-iframe').style.zIndex = '2';

    unsub = thatProfile.subscribe(currentUser => {
      if (currentUser.id) {
        window.tidioChatApi.setVisitorData({
          distinct_id: currentUser.id,
          email: currentUser.email,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
        });

        window.tidioChatApi.setContactProperties({
          company: currentUser.company,
          canfeature: currentUser.canFeature ? 'true' : 'false',
        });

        window.tidioChatApi.addVisitorTags([
          currentUser.id,
          `https://that.us/member/${currentUser.profileSlug}`,
        ]);
      }
    });
  }

  (function () {
    if (window.tidioChatApi)
      window.tidioChatApi.on('ready', onTidioChatApiReady);
    else document.addEventListener('tidioChat-ready', onTidioChatApiReady);
  })();
</script>

<svelte:head>
  <title>{$metaTagsStore ? $metaTagsStore.title : 'Welcome to THAT'}</title>

  {#each metaTags($metaTagsStore) as tags}
    <meta {...tags} />
  {/each}

  <!-- tidio chat bot -->
  <script async src="//code.tidio.co/qcwuuigfzw3cjegsc2fyo0sniyh3c3ue.js">
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
    <Route
      exact
      path="/login"
      component="{Login}"
      documentReferrer="{documentReferrer}"
    />
    <Route exact path="/logout" component="{Logout}" />
    <Route exact path="/changelog" component="{ChangeLog}" />
    <Route exact path="/changelog-missed" component="{ChangeLogMissed}" />

    <Route exact path="/partners" component="{Partners}" />
    <Route exact path="/partners/:partner" component="{Partner}" />

    <Route exact path="/members" component="{Members}" />
    <Route exact path="/members/:member" component="{Member}" />

    <Route exact path="/communities" component="{Communities}" />
    <Route exact path="/communities/:community" component="{Community}" />

    <Route exact path="/activities" component="{List}" />
    <Route path="/sessions" component="{SessionRedirect}" />

    <Route exact path="/support/faq" component="{FAQ}" />
    <Route exact path="/support/welcome" component="{NewUserWelcome}" />
    <Route
      exact
      path="/support/what-is-an-activity"
      component="{WhatIsAnActivity}"
    />
    <Route
      exact
      path="/support/joining-an-activity"
      component="{JoiningAnActivity}"
    />
    <Route
      exact
      path="/support/creating-an-activity"
      component="{CreateAnActivity}"
    />
    <Route
      exact
      path="/support/staying-up-to-date"
      component="{StayingUpToDate}"
    />

    <Route
      exact
      path="/activities/create"
      component="{Create}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route
      exact
      path="/activities/edit/:activityId"
      component="{EditActivity}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route exact path="/activities/:activityId" component="{Activity}" />
    <Route exact path="/events/:eventName" component="{Event}" />

    <Route
      exact
      path="/join/:activityId"
      component="{Live}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route
      exact
      path="/my/favorites"
      component="{MyFavorites}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route
      exact
      path="/my/submissions"
      component="{MySubmissions}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route
      exact
      path="/my/profile"
      component="{Profile}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route
      exact
      path="/my/badges"
      component="{Badges}"
      condition="{isLoggedIn}"
      redirect="/login"
    />

    <Route exact path="/not-found" component="{NotFound}" />

    <Route fallback>
      <NotFound />
    </Route>
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
