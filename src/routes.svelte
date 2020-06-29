<script>
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Dashboard from './routes/Dashboard.svelte';
  import CreateSession from './routes/session/Create.svelte';

  import Router from './pager/Router.svelte';
  import Route from './pager/Route.svelte';
  import NotFound from './pager/NotFound.svelte';

  // export default [
  //   { path: '/', component: Home },
  //   { path: '/login', component: Login },
  //   { path: '/dashboard', component: Dashboard },
  //   { path: '/session/create', component: CreateSession },
  // ];
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/dashboard" component={Dashboard} />
  <Route path="/session/create" component={CreateSession} />
  <NotFound>
    <h2>Sorry. Page not found.</h2>
  </NotFound>
</Router>
