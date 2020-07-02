<script>
  import {
    auth0Promise,
    isAuthenticated,
    token,
    user,
    login,
    logout,
  } from '../utilities/security.js';
</script>

<div>
  {#await auth0Promise}
    <p>soemthing???</p>

  {:then}
    {#if $isAuthenticated}
      <p>anything</p>

      <pre>isAuthenticated: {$isAuthenticated}</pre>
      <pre>authToken: {$token}</pre>
      <pre>userInfo: {JSON.stringify($user, null, 2)}</pre>
      <!-- <pre>authError: {$authError}</pre> -->

      <a on:click="{logout}">Logout</a>
    {:else}
      <a on:click="{login}">Login</a>
    {/if}
  {/await}

</div>
