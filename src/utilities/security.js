/* eslint-disable no-undef */

import { writable } from 'svelte/store';
import createAuth0Client from '@auth0/auth0-spa-js';
import { getClient } from '@urql/svelte';
import { securityConfig } from '../config';

const QUERY_ME = `
  query getMe {
    members {
      me {
        id
        firstName
        lastName
        profileImage
        profileSlug
      }
    }
  }
`;

export const user = writable({});
export const thatProfile = writable({});
export const token = writable('');
export const isAuthenticated = writable(false);
export const auth0Promise = createAuth0Client(securityConfig);

export const logout = async () => {
  const auth0 = await auth0Promise;

  auth0.logout({
    returnTo: window.location.origin,
  });
};

export const login = async (
  redirectPage = 'http://localhost:5000/sessions',
) => {
  const auth0 = await auth0Promise;

  // const appState = preserveRoute
  //   ? { pathname: window.location.pathname, search: window.location.search }
  //   : {};

  await auth0.loginWithRedirect({
    redirect_uri: redirectPage || window.location.origin,
    // redirect_uri: redirectPage || window.location.href,
  });
};

export async function generateAuth0() {
  const auth0 = await auth0Promise;
  const query = window.location.search;

  if (query.includes('code=') && query.includes('state=')) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }

  if (await auth0.isAuthenticated()) {
    isAuthenticated.set(true);

    // set the base profile from auth0
    user.set(await auth0.getUser());

    token.set(await auth0.getTokenSilently());

    // set the THAT membership profile
    thatProfile.set(
      await getClient()
        .query(QUERY_ME)
        .toPromise()
        .then((results) => ({
          ...results.data.members.me,
        })),
    );
  }
}

generateAuth0();
