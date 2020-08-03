<script>
  export let router;

  import { onMount } from 'svelte';
  import { query } from '@urql/svelte';
  import _ from 'lodash';
  import { navigateTo } from 'yrv';
  import Icon from 'svelte-awesome';
  import { getClient } from '@urql/svelte';

  import { ModalError, ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import WarningNotification from '../../components/notifications/Warning.svelte';
  import { isAuthenticated, thatProfile } from '../../utilities/security.js';
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';

  import {
    expand as expandIcon,
    compress as compressIcon,
  } from 'svelte-awesome/icons';

  const { setAttendance } = sessionsApi(getClient());

  const { sessionId } = router.params;
  const imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  const jitsiFrameTopBuffer = 340;

  const QUERY_SESSION = query({
    query: `
      query getSessionById($eventId: ID!, $sessionId: ID!) {
        events {
          event(id: $eventId) {
            session: sessionById(sessionId: $sessionId) {  
              title
              shortDescription
            }
          }
        }
      }
    `,
    variables: { eventId: 'ByE7Dc7eCGcRFzLhWhuI', sessionId },
    requestPolicy: 'cache-and-network',
  });

  $: sessionQuery = QUERY_SESSION();

  let incompleteProfile = true;
  $: if (!_.isEmpty($thatProfile)) {
    incompleteProfile = false;
  }

  $: if ($isAuthenticated && !incompleteProfile) {
    Promise.resolve(setAttendance(sessionId));
  }

  let api;

  let userMuted = true;
  const handleMuted = ({ muted }) => {
    userMuted = muted;
  };

  // https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
  function initJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: `THAT-${sessionId}`,
      width: '100%',
      height: window.document.body.scrollHeight - jitsiFrameTopBuffer,
      // https://github.com/jitsi/jitsi-meet/blob/master/config.js
      configOverwrite: {
        startWithAudioMuted: true,
        prejoinPageEnabled: false, // todo.. We could prolly drop our own image.
        // enableWelcomePage: true, // not sure what it does
      },
      // https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          'profile',
          'chat',
          // 'recording',
          // 'livestreaming',
          'etherpad',
          // 'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          // 'invite',
          'feedback',
          'stats',
          'shortcuts',
          'tileview',
          'videobackgroundblur',
          'download',
          'help',
          'mute-everyone',
          // 'security',
        ],
      },
      userInfo: {
        displayName: `${$thatProfile.firstName} ${$thatProfile.lastName}`,
      },
      onload: () => {
        // update here just to cover loading scenarios
        api.executeCommand(
          'avatarUrl',
          `${$thatProfile.profileImage}${imageCrop}`,
        );

        api.executeCommand(
          'displayName',
          `${$thatProfile.firstName} ${$thatProfile.lastName}`,
        );

        api.getIFrame().focus();
        handleResize();
      },

      parentNode: document.getElementById('meet'),
    };

    api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListener('audioMuteStatusChanged', handleMuted);

    api.addEventListener('readyToClose', () => {
      navigateTo(`/sessions`, { replace: true });
    });
  }

  let expanded = false;

  function handleResize() {
    _setMainHeight();
    _setJitsoFrameSize();
    _setContentHeightWidth();
  }

  function expandJitsiFrame() {
    expanded = true;
    _setMainHeight();
    _setJitsoFrameSize();
    _setContentHeightWidth();
  }

  function shrinkJitsiFrame() {
    expanded = false;
    _setMainHeight();
    _setJitsoFrameSize();
    _setContentHeightWidth();
  }

  function _setMainHeight() {
    const main = window.document.getElementById('main');
    main.style.minHeight = expanded ? `${window.innerHeight - 100}px` : 'auto';
  }

  function _setContentHeightWidth() {
    const element = window.document.getElementById('content-block');

    element.style.height = expanded ? `${window.innerHeight - 130}px` : '100%';
    element.style.width = expanded ? `${window.innerWidth - 50}px` : '100%';

    if (expanded) {
      element.classList.add('absolute', 'left-5');
      element.scrollIntoView();
    } else {
      element.classList.remove('absolute', 'left-5');
      window.scrollTo(0, 0);
    }

    // Property read to get webkit to repaint the element
    element.offsetHeight;
  }

  function _setJitsoFrameSize() {
    const element = window.document.getElementById('jitsiConferenceFrame0');

    if (expanded) {
      element.style.height = `${window.innerHeight - 180}px`;
    } else {
      element.style.height = `${window.innerHeight - jitsiFrameTopBuffer}px`;
    }
  }
</script>

<svelte:window on:resize="{handleResize}" />

<svelte:head>
  <title>Join * THAT.us</title>
  <script src="https://meet.jit.si/external_api.js" on:load="{initJitsi}">

  </script>
</svelte:head>

{#if incompleteProfile}
  <ModalError
    title="Oh NO! You have an incomplete profile!"
    text="It appears you haven't created your profile yet. You can't create a
    session until that's complete."
    action="{{ title: 'Create Profile', href: '/my/profile' }}"
    returnTo="{{ title: 'Return to Schedule', href: '/sessions' }}"
  />
{/if}

<StackedLayout>
  <div slot="header">
    <Nav />

    {#if $sessionQuery.data && $sessionQuery.data.events.event.session}
      <ActionHeader title="{$sessionQuery.data.events.event.session.title}">
        <LinkButton href="/sessions/{sessionId}" text="Session Details" />
      </ActionHeader>
    {/if}
  </div>

  <div slot="body" class="relative">
    <button
      class="absolute top-12 left-0 cursor-pointer ml-48 mt-1"
      on:click="{expanded ? shrinkJitsiFrame : expandJitsiFrame}"
    >
      <Icon
        data="{expanded ? compressIcon : expandIcon}"
        class="h-6 w-6 text-white"
      />
    </button>
    <div id="meet" class="object-center"></div>
  </div>

  <div slot="footer">
    {#if userMuted}
      <WarningNotification
        message="You're currently muted. Click to unmute"
        on:click="{() => api.executeCommand('toggleAudio')}"
      />
    {/if}
  </div>

</StackedLayout>
