import { onMount, setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import createAuth0Client from '@auth0/auth0-spa-js';

const isLoading = writable(true);
const isAuthenticated = writable(false);
const authToken = writable('');
const userInfo = writable({});
const authError = writable(null);
const AUTH_KEY = {};

// Default Auth0 expiration time is 10 hours or something like that.
// If you want to get fancy you can parse the JWT token and get
// token's actual expiration time.
const refreshRate = 10 * 60 * 60 * 1000;

function createAuth(config) {
  let auth0 = null;
  let intervalId;

  isAuthenticated.subscribe((v) => {
    console.log(`isAuthenticated ${v}`);
  });

  // You can use Svelte's hooks in plain JS files. How nice!
  onMount(async () => {
    console.log('on mount in auth');
    try {
      console.log('createing auth client');
      auth0 = await createAuth0Client(config);
    } catch (e) {
      console.error('in create client', e);
    }

    // Not all browsers support this, please program defensively!
    const params = new URLSearchParams(window.location.search);

    // Check if something went wrong during login redirect
    // and extract the error message
    if (params.has('error')) {
      authError.set(new Error(params.get('error_description')));
    }

    // if code then login success
    if (params.has('code') && params.has('state')) {
      console.log('we haz code and state');
      // Let the Auth0 SDK do it's stuff - save some state, etc.

      const x = await auth0.handleRedirectCallback();
      console.log('what is x', x);

      // Can be smart here and redirect to original path instead of root
      // TODO fix url to redirect too
      window.history.replaceState({}, document.title, '/');
      authError.set(null);
    }

    const _isAuthenticated = await auth0.isAuthenticated();
    console.log('auth 0 says authentiated ==', _isAuthenticated);
    isAuthenticated.set(_isAuthenticated);

    if (_isAuthenticated) {
      // while on it, fetch the user info
      userInfo.set(await auth0.getUser());

      // Get the access token. Make sure to supply audience property
      // in Auth0 config, otherwise you will soon start throwing stuff!
      const token = await auth0.getTokenSilently();
      authToken.set(token);

      // refresh token after specific period or things will stop
      // working. Useful for long-lived apps like dashboards.
      intervalId = setInterval(async () => {
        authToken.set(await auth0.getTokenSilently());
      }, refreshRate);
    }

    isLoading.set(false);

    // clear token refresh interval on component unmount
    return () => {
      intervalId && clearInterval(intervalId);
    };
  });

  // Provide a redirect page if you need.
  // It must be whitelisted in Auth0. I think.
  // todo.. default is wrong..
  const login = async (redirectPage = 'http://localhost:5000') => {
    console.log(config);
    auth0 = await createAuth0Client(config);

    await auth0.loginWithRedirect({
      redirect_uri: redirectPage || window.location.origin,
      prompt: 'login', // Force login prompt. No silence auth for you!
    });
  };

  const logout = () => {
    auth0.logout({
      returnTo: window.location.origin,
    });
  };

  const auth = {
    isLoading,
    isAuthenticated,
    authToken,
    authError,
    login,
    logout,
    userInfo,
  };

  // Put everything in context so that child components can access the state
  setContext(AUTH_KEY, auth);

  return auth;
}

// helper function for child components to access the auth context
function getAuth() {
  return getContext(AUTH_KEY);
}

export { createAuth, getAuth };
