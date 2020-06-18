import Home from './routes/Home.svelte';
import Login from './routes/Login.svelte';
import Dashboard from './routes/Dashboard.svelte';
import CreateSession from './routes/session/Create.svelte';

export default [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/session/create', component: CreateSession },
];
