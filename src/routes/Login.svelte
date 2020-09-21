<script>
  export let documentReferrer = '/activities';

  import { onMount } from 'svelte';
  import qs from 'query-string';

  import metaTagsStore from '../store/metaTags';
  import { login } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  const { signup = false } = qs.parse(location.search);

  onMount(async () => {
    await login(documentReferrer, signup);
  });

  metaTagsStore.set({
    title: 'Login - THAT',
    description: 'Login to your THAT account.',
    openGraph: {
      type: 'website',
      url: `https://that.us/login`,
    },
  });
</script>

<div>
  <ModalNoAction
    title="Logging In..."
    text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
  />
</div>
