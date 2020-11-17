<script>
  export let router;

  // 3rd Partyimport { createEventDispatcher } from 'svelte';
  import { isEmpty } from 'lodash';
  import { navigateTo } from 'yrv';
  import Icon from 'svelte-awesome';
  import { getClient, operationStore, query } from '@urql/svelte';
  import {
    expand as expandIcon,
    compress as compressIcon,
  } from 'svelte-awesome/icons';

  // ui support
  import { ModalError, ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import WarningNotification from '../../components/notifications/Warning.svelte';

  // data / utilities
  import config from '../../config';
  import metaTagsStore from '../../store/metaTags';
  import {
    isAuthenticated,
    thatProfile,
    user,
  } from '../../utilities/security.js';
  import sessionsApi from '../../dataSources/api.that.tech/sessions.js';

  const { activityId } = router.params;
  const { setAttendance } = sessionsApi(getClient());
  const imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  const jitsiFrameTopBuffer = 340;

  let expanded = false;
  let api;
  let bgColor = 'bg-white';
  let isCurrentlySharing = false;
  let userMuted = true;
  let incompleteProfile = true;

  let displayName = 'Johnny 5'; // generate a fake name...
  let avatarUrl = config.defaultProfileImage;

  const activity = operationStore(
    `
      query getSessionById($activityId: ID!) {
        sessions {
          session (sessionId: $activityId) {  
            title
            shortDescription
          }
        }
      }
    `,
    {
      activityId,
    },
    {
      requestPolicy: 'network-only',
    },
  );
  query(activity);

  function handleMuted({ muted }) {
    userMuted = muted;
  }

  // https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
  function initJitsi() {
    let toolButtonConfig = [
      'microphone',
      'camera',
      'closedcaptions',
      'desktop',
      'fullscreen',
      'fodeviceselection',
      'hangup',
      'profile',
      'chat',
      'etherpad',
      'settings',
      'raisehand',
      'videoquality',
      'filmstrip',
      'feedback',
      'stats',
      'shortcuts',
      'tileview',
      'videobackgroundblur',
      'download',
      'help',
      'mute-everyone',
    ];

    if ($user['http://auth.that.tech/roles'].includes('Admin')) {
      toolButtonConfig.push(
        'recording',
        'livestreaming',
        // 'invite', we can already do this just by passing the url to someone.
        'sharedvideo',
        'security',
      );
    }

    const domain = 'meet.jit.si';
    const options = {
      roomName: `THAT-${activityId}`,
      width: '100%',
      height: window.document.body.scrollHeight - jitsiFrameTopBuffer,
      // https://github.com/jitsi/jitsi-meet/blob/master/config.js
      configOverwrite: {
        startWithAudioMuted: true,
        prejoinPageEnabled: false, // todo.. We could prolly drop our own image.
        // enableWelcomePage: true, // not sure what it does
        brandingRoomAlias: `https://that.us/join/THAT-${activityId}`,
        transcribingEnabled: true, // doesn't seem to work, but it's listed as valid
      },
      // https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: toolButtonConfig,
        DEFAULT_REMOTE_DISPLAY_NAME: 'THAT Camper',
      },
      userInfo: {
        displayName: `${$thatProfile?.firstName} ${$thatProfile?.lastName}`,
      },
      onload: () => {
        // update here just to cover loading scenarios
        api.executeCommand('avatarUrl', avatarUrl);
        api.executeCommand('displayName', displayName);

        api.getIFrame().focus();
        handleResize();
      },

      parentNode: document.getElementById('meet'),
    };

    api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListener('audioMuteStatusChanged', handleMuted);

    api.addEventListener('readyToClose', () => {
      navigateTo(`/activities`, { replace: true });
    });

    api.addEventListener('screenSharingStatusChanged', ({ on }) => {
      isCurrentlySharing = on;
      bgColor = isCurrentlySharing ? 'bg-red-500' : 'bg-white';
    });
  }

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
    if (main) {
      main.style.minHeight = expanded
        ? `${window.innerHeight - 100}px`
        : 'auto';
    }
  }

  function _setContentHeightWidth() {
    const element = window.document.getElementById('content-block');

    if (element) {
      element.style.height = expanded
        ? `${window.innerHeight - 130}px`
        : '100%';
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
  }

  function _setJitsoFrameSize() {
    const element = window.document.getElementById('jitsiConferenceFrame0');
    if (element) {
      if (expanded) {
        element.style.height = `${window.innerHeight - 180}px`;
      } else {
        element.style.height = `${window.innerHeight - jitsiFrameTopBuffer}px`;
      }
    }
  }

  $: if (!isEmpty($thatProfile)) {
    incompleteProfile = false;
  }

  $: if ($isAuthenticated && !incompleteProfile) {
    Promise.resolve(setAttendance(activityId));

    avatarUrl = `${$thatProfile.profileImage}${imageCrop}`;
    displayName = `${$thatProfile.firstName} ${$thatProfile.lastName}`;

    if (api) {
      api.executeCommand('avatarUrl', avatarUrl);
      api.executeCommand('displayName', displayName);
    }
  }

  metaTagsStore.set({
    title: 'Join In - THAT',
    description: 'Join in the conversation today.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/join`,
    },
  });
</script>

<svelte:window on:resize="{handleResize}" />

<svelte:head>
  <script src="https://meet.jit.si/external_api.js" on:load="{initJitsi}">
  </script>
</svelte:head>

{#if incompleteProfile}
  <ModalError
    title="Oh NO! You have an incomplete profile!"
    text="It appears you haven't created your profile yet. You can't create a
    activity until that's complete."
    action="{{ title: 'Create Profile', href: '/my/profile' }}"
    returnTo="{{ title: 'Return to Activities', href: '/activities' }}"
  />
{/if}

<StackedLayout bodyBackgroundColor="{bgColor}">
  <div slot="header">
    <Nav />

    {#if $activity?.data?.sessions?.session}
      <ActionHeader title="{$activity.data.sessions.session.title}">
        <LinkButton href="/activities/{activityId}" text="Activity Details" />
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
