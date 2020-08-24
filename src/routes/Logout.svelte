<script>
  import { onMount } from 'svelte';
  import Meta from '../components/seo/Meta.svelte';

  import { logout } from '../utilities/security.js';
  import { ModalNoAction } from '../elements';

  onMount(async () => {
    await logout();
  });
</script>

<Meta
  title="Logout - THAT"
  description="todo"
  openGraph="{{ title: 'Logout * THAT', description: 'todo', type: 'website', url: `https://that.us/logout` }}"
/>

<div>
  <ModalNoAction
    title="Logging Out..."
    text="You will be redirect to our home page once completed."
  />
</div>
