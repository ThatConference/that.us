// pages
import Home from './pages/Home.svelte';
import SessionList from './pages/session/List.svelte';
import CreateSession from './pages/session/Create.svelte';
import Session from './pages/session/session.svelte';
import Live from './pages/session/Live.svelte';
import Login from './pages/Login.svelte';

function userIsAdmin() {
  // check if user is admin and returns true or false
  return false;
}

const routes = [
  { name: '/', component: Home },
  { name: 'login', component: Login },

  {
    name: 'session',
    nestedRoutes: [
      {
        name: 'create',
        component: CreateSession,
        onlyIf: { guard: userIsAdmin, redirect: '/login' },
      },
    ],
  },
  {
    name: 'sessions',
    nestedRoutes: [
      { name: 'index', component: SessionList },
      { name: 'session', component: Session },
      { name: 'live/:id', component: Live },
    ],
  },
];

export { routes };
