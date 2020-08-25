<script>
  import { onMount } from 'svelte';
  import metaTagsStore from '../store/metaTags';
  import { logout } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  onMount(async () => {
    await logout();
  });

  metaTagsStore.set({
    title: 'Logout - THAT',
    description: 'Logout of your THAT account.',
    openGraph: {
      type: 'website',
      url: `https://that.us/logout`,
    },
  });
</script>

<div>
  <ModalNoAction
    title="Logging Out..."
    text="You will be redirect to our home page once completed."
  />
</div>
