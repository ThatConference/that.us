import { writable } from 'svelte/store';
import config from '../../config';

const favoriteFragment = `
  fragment sessionFields on AcceptedSession {
    id
    title
    shortDescription
    status
    startTime
    tags
    speakers {
      id
      firstName
      lastName
      profileImage
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

export default (client, eventId = config.eventId) => {
  const favoritesStore = writable([]);

  function query() {
    const variables = {
      eventId,
    };

    return client
      .query(QUERY_MY_FAVORITES, variables)
      .toPromise()
      .then((r) => {
        let results = [];

        // set the store
        if (r.data) {
          const { favorites } = r.data.sessions.me;
          favoritesStore.set(favorites); // set the store
          results = favorites; // set the return results
        }

        return results;
      });
  }

  async function toggle(sessionId) {
    const mutationVariables = {
      eventId,
      sessionId,
    };
    let results = false;

    const { data, error } = await client
      .mutation(TOGGLE_FAVORITE, mutationVariables)
      .toPromise();

    // update store
    if (data) {
      const { toggle: fav } = data.sessions.favoriting;
      if (fav) {
        // is toggled
        favoritesStore.update((i) => [...i, fav]);
        results = true;
      } else {
        // not toggled
        favoritesStore.update((favs) => favs.filter((i) => i.id !== sessionId));
        results = false;
      }
    }

    return results;
  }

  const get = () => query();
  const getIds = () => query().then((r) => r.map((i) => i.id));

  // favoritesStore.set(query());

  return {
    favoritesStore,
    get,
    getIds,
    toggle,
  };
};
