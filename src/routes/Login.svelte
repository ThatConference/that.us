<script>
  import { onMount } from 'svelte';
  import { login } from '../utilities/security.js';

  import { ModalNoAction } from '../elements';

  onMount(async () => {
    await login();
  });
</script>

<div>
  <ModalNoAction
    title="Log In..."
    text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
  />
</div>
