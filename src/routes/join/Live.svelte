<script>
  import { ActionHeader } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  import Nav from '../../components/Nav.svelte';

  export let router;
  const { sessionId } = router.params;

  function initJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: `THAT-${sessionId}`,
      width: '100%',
      height: 1000,
      userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'John Doe',
      },
      parentNode: document.getElementById('meet'),
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
  }
</script>

<svelte:head>
  <script src="https://meet.jit.si/external_api.js" on:load="{initJitsi}">

  </script>
</svelte:head>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="WHATEVER MY OPEN SPACE TITLE IS" />
  </div>

  <div slot="body">
    <div id="meet" class="object-center"></div>
  </div>

  <div slot="footer"></div>

</StackedLayout>
