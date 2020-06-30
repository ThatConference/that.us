<script>
  import { initClient } from '@urql/svelte';

  // components
  import { Router, Route, NotFound, redirect } from './utilities/pager';

  // pages
  import Tailwindcss from './elements/Tailwindcss.svelte';
  import Home from './pages/Home.svelte';
  import Login from './pages/Login.svelte';
  import SessionList from './pages/session/List.svelte';
  import CreateSession from './pages/session/Create.svelte';

  initClient({ url: 'http://localhost:9090/graphql' });

  const guard = (ctx, next) => {
    // check for example if user is authenticated
    if (true) {
      redirect('/login');
    } else {
      // go to the next callback in the chain
      next();
    }
  };
</script>

<main>
  <Tailwindcss />
  <Router>
    <Route path="/" component="{Home}" />
    <Route path="/login" component="{Login}" />
    <Route path="/sessions" component="{SessionList}" />
    <Route path="/session/create" component="{CreateSession}" />
    <NotFound>
      <h2>Sorry. Page not found.</h2>
    </NotFound>
    <Route path="/news" middleware="{[guard]}">
      <h2>Latest News</h2>
      <p>Finally some good news!</p>
    </Route>
  </Router>

</main>
