<script>
  import Header from '../../elements/Header.svelte';
  import Nav from '../../components/Nav.svelte';

  export let currentRoute;
  const { id } = currentRoute.namedParams;

  function initJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: `THAT-${id}`,
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

<div>
  <div class="bg-gray-800 pb-32">
    <Nav />
    <Header title="WHATEVER MY OPEN SPACE TITLE IS" />
    <p>some awesome description....</p>
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">

        <div id="meet" class="object-center"></div>

      </div>
    </div>
  </main>
</div>
