<script>
  import { onMount } from 'svelte';
  import { logout } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  onMount(async () => {
    await logout();
  });
</script>

<div>
  <ModalNoAction
    title="Logging Out..."
    text="You will be redirect to our home page once completed."
  />
</div>
