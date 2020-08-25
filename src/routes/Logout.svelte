<script>
  import { onMount } from 'svelte';
  import metaTags from '../utilities/seo/metaTags';

  import { logout } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  onMount(async () => {
    await logout();
  });

  const metaInfo = {
    title: 'Logout - THAT',
    description: 'todo',
    openGraph: {
      type: 'website',
      url: `https://that.us/logout`,
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
    title="Logging Out..."
    text="You will be redirect to our home page once completed."
  />
</div>
