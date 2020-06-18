<script>
  import { setContext } from 'svelte';
  import router from 'page';

  import { client } from './apollo.js';
  import routes from './routes';
  import Tailwindcss from './Tailwindcss.svelte';

  setContext('apolloClient', client);

  let page;
  let params;
  let user = false; // todo we will need to set the user later

  routes.forEach(route => {
    router(
      route.path,

      (ctx, next) => {
        params = ctx.params;
        next();
      },

      // Check if auth is valid. If so, set the page to the component otherwise redirect to login.
      () => {
        if (route.auth && !user) {
          router.redirect('/login');
        } else {
          page = route.component;
        }
      },
    );
  });

  router.start();
</script>

<Tailwindcss />
<svelte:component this={page} {params} />
