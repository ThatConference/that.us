<script>
  export let currentRoute;
  export let params;

  import {
    Auth0Context,
    authError,
    authToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    userInfo,
  } from '@dopry/svelte-auth0';

  import Hero from '../components/Hero.svelte';
  import CTA from '../components/CTA.svelte';
</script>

<Hero />
<CTA />
