<script>
  import { onMount } from 'svelte';
  import { query } from '@urql/svelte';

  import { ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import { isAuthenticated, thatProfile } from '../../utilities/security.js';

  export let router;

  const { sessionId } = router.params;
  const imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

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

  // https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
  function initJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: `THAT-${sessionId}`,
      width: '100%',
      height: 1000,
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
      },

      parentNode: document.getElementById('meet'),
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
  }
</script>

<svelte:head>
  <title>Join * THAT.us</title>
  <script src="https://meet.jit.si/external_api.js" on:load="{initJitsi}">

  </script>
</svelte:head>

<StackedLayout>
  <div slot="header">
    <Nav />

    {#if $sessionQuery.data}
      <ActionHeader title="{$sessionQuery.data.events.event.session.title}">
        <LinkButton href="/sessions/{sessionId}" text="Session Details" />
      </ActionHeader>
    {/if}
  </div>

  <div slot="body">
    <div id="meet" class="object-center"></div>
  </div>

  <div slot="footer"></div>

</StackedLayout>
