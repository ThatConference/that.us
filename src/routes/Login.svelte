<script>
  export let router;
  export let documentReferrer = '/sessions';

  import { onMount } from 'svelte';
  import qs from 'query-string';

  import { login } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  const { signup = false } = qs.parse(location.search);

  onMount(async () => {
    await login(documentReferrer, signup);
  });
</script>

<div>
  <ModalNoAction
    title="Logging In..."
    text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
  />
</div>
