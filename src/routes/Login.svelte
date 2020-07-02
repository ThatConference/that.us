<script>
  import { onMount } from 'svelte';
  import { login } from '../utilities/security.js';

  onMount(async () => {
    await login();
  });
</script>

<p>Let's get you signed in...</p>
