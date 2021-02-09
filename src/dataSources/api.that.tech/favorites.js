import { writable } from 'svelte/store';

import { log } from './utilities/error';

const favoriteFragment = `
  fragment sessionFields on AcceptedSession {
    id
    title
    shortDescription
    status
    startTime
    tags
    communities
    speakers {
      id
      firstName
      lastName
      profileImage
      profileSlug
      earnedMeritBadges {
        id
        name
        image
        description
      }
    }
  }
`;

const TOGGLE_FAVORITE = `
  ${favoriteFragment}
  mutation toggleFavorite($eventId: ID!, $sessionId: ID!) {
    sessions {
      favoriting(eventId: $eventId) {
        toggle(sessionId: $sessionId) {
          ...sessionFields
        }
      }  
    }
  }
`;

export const QUERY_MY_FAVORITES = `
  ${favoriteFragment}
  query memberFavorites ($eventId: ID!) {
    sessions {
      me {
        favorites(eventId: $eventId) {
          ...sessionFields
        }
      }
    }
  }
`;

export default client => {
  const favoritesStore = writable([]);

  function query(eventId) {
    const variables = {
      eventId,
    };

    return client
      .query(QUERY_MY_FAVORITES, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_favorites');

        let results = [];

        // set the store
        if (data && !error) {
          const { favorites } = data.sessions.me;
          favoritesStore.set(favorites); // set the store
          results = favorites; // set the return results
        }

        results = results.filter(s => s.status === 'ACCEPTED');
        results.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        return results;
      });
  }

  async function toggle(sessionId, eventId) {
    const mutationVariables = {
      eventId,
      sessionId,
    };
    let results = false;

    const { data, error } = await client
      .mutation(TOGGLE_FAVORITE, mutationVariables)
      .toPromise();

    if (error) log(error, 'mutate_favorites');

    // update store
    if (data) {
      const { toggle: fav } = data.sessions.favoriting;
      if (fav) {
        // is toggled
        favoritesStore.update(i => [...i, fav]);
        results = true;
      } else {
        // not toggled
        favoritesStore.update(favs => favs.filter(i => i.id !== sessionId));
        results = false;
      }
    }

    return results;
  }

  const get = eventId => query(eventId);
  const getIds = eventId => query(eventId).then(r => r.map(i => i.id));

  // favoritesStore.set(query());

  return {
    favoritesStore,
    get,
    getIds,
    toggle,
  };
};
