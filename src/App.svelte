<script>
  import { onMount, onDestroy } from 'svelte';
  import { initClient } from '@urql/svelte';
  import { router } from 'yrv';
  import { v4 as uuidv4 } from 'uuid';
  import * as Sentry from '@sentry/browser';
  import LogRocket from 'logrocket';

  import config, { events } from './config';
  import { token, thatProfile, setupAuth } from './utilities/security.js';
  import currentEvent from './store/currentEvent';
  import metaTagsStore from './store/metaTags';
  import { showReleaseNotes } from './store/siteVersion';
  import { messages } from './store/notificationCenter';
  import metaTags from './utilities/seo/metaTags';

  // ui components
  import Tailwindcss from './elements/Tailwindcss.svelte';
  import Router from './Router.svelte';

  let unsub;
  currentEvent.set(events.thatUs); // setting the default event

  function createCorrelationId() {
    const id = uuidv4();

    Sentry.configureScope(scope => {
      scope.setTag('correlationId', id);
    });

    return id;
  }

  function onTidioChatApiReady() {
    /*
      resets the z-index of the tidio iframe such that it's under warnings.
      ... we might have to set it better based on some other layering going on in places.
    */
    document.getElementById('tidio-chat-iframe').style.zIndex = '40';

    unsub = thatProfile.subscribe(currentUser => {
      if (currentUser) {
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

  let client = initClient({
    url: config.api,
    fetchOptions: () => ({
      headers: {
        authorization: $token ? `Bearer ${$token}` : '',
        'that-site': 'that.us',
        'that-correlation-id': createCorrelationId(),
      },
    }),
    // todo.. this needs to be revisited... and when we get a new graph client.
    // requestPolicy: 'cache-and-network',
    requestPolicy: 'network-only',
  });

  router.subscribe(e => {
    if (!e.initial) {
      // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
      window.gtag('config', config.gtag, {
        page_path: e.path,
      });
    }
  });

  router.subscribe(() => {
    window.scrollTo(0, 0);
  });

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

    if (window.tidioChatApi) {
      window.tidioChatApi.on('ready', onTidioChatApiReady);
    } else {
      document.addEventListener('tidioChat-ready', onTidioChatApiReady);
    }
  });

  onDestroy(unsub);

  $: if ($thatProfile) {
    let { id, email } = $thatProfile;

    Sentry.configureScope(scope => {
      scope.setUser({
        email,
        id,
      });
      scope.setExtra('logRocketSession', LogRocket.sessionURL);
    });

    LogRocket.identify(id, {
      email,
    });
  }
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
  <Router />
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

  .lineBreaks {
    white-space: pre-line;
  }
</style>
