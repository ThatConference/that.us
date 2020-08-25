<script>
  export let router;
  export let documentReferrer = '/sessions';

  import { onMount } from 'svelte';
  import qs from 'query-string';

  import metaTags from '../utilities/seo/metaTags';
  import { login } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  const { signup = false } = qs.parse(location.search);

  onMount(async () => {
    await login(documentReferrer, signup);
  });

  const metaInfo = {
    title: 'Login - THAT',
    description: 'todo',
    openGraph: {
      type: 'website',
      url: `https://that.us/login`,
    },
  };
</script>

<svelte:head>
  <title>{metaInfo.title}</title>

  {#each metaTags(metaInfo) as tags}
    <meta {...tags} />
  {/each}
</svelte:head>

<div>
  <ModalNoAction
    title="Logging In..."
    text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
  />
</div>
