/* eslint-disable no-undef */

import { writable } from 'svelte/store';
import createAuth0Client from '@auth0/auth0-spa-js';
import { getClient } from '@urql/svelte';
import { navigateTo } from 'yrv';

import { securityConfig } from '../config';

securityConfig.redirect_uri = `${window.location.origin}/sessions`;

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

  await auth0.logout({
    returnTo: window.location.origin,
  });
};

export const login = async (documentReferrer) => {
  const auth0 = await auth0Promise;

  const appState = {
    pathname: documentReferrer,
    search: window.location.search,
  };

  await auth0.loginWithRedirect({
    redirect_uri: `${window.location.origin}/sessions`,
    appState,
  });
};

export async function generateAuth0() {
  const auth0 = await auth0Promise;
  const query = window.location.search;

  let redirectResult;

  if (query.includes('code=') && query.includes('state=')) {
    redirectResult = await auth0.handleRedirectCallback();
    // window.history.replaceState({}, document.title, '/');
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
    if (redirectResult)
      navigateTo(redirectResult.appState.pathname, { replace: true });
  }
}

generateAuth0();
