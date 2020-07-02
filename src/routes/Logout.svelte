<script>
  import { onMount } from 'svelte';
  import { logout } from '../utilities/security.js';

  onMount(async () => {
    await logout();
    console.log('did we really?');
  });
</script>

<p>You are now being logged out, bye...</p>
