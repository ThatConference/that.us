import config from '../../config';

const TOGGLE_FAVORITE = `
  mutation toggleFavorite($eventId: ID!, $sessionId: ID!) {
    sessions {
      favoriting(eventId: $eventId) {
        toggle(sessionId: $sessionId) {
          id
        }
      }  
    }
  }
`;

export const QUERY_MY_FAVORITES = `
  query memberFavorites ($eventId: ID!) {
    sessions {
      me {
        favorites(eventId: $eventId) {
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
      }
    }
  }
`;
export const QUERY_MY_FAVORITES_IDS = `
  query MyFavoriteIds ($eventId: ID!) {
    sessions {
      me {
        favorites(eventId: $eventId) {
          id
        }
      }
    }
  }
`;

export default (client) => {
  const toggleFavorite = (eventId, sessionId) => {
    const mutationVariables = {
      eventId,
      sessionId,
    };

    return client.mutation(TOGGLE_FAVORITE, mutationVariables).toPromise();
  };

  const queryMyFavoriteIds = () => {
    const variables = {
      eventId: config.eventId,
    };

    return client
      .query(QUERY_MY_FAVORITES_IDS, variables)
      .toPromise()
      .then((r) => {
        let results = [];

        if (r.data) {
          const { favorites } = r.data.sessions.me;
          results = favorites.map((i) => i.id);
        }

        return results;
      });
  };

  const queryMyFavorites = () => {
    const variables = {
      eventId: config.eventId,
    };

    return client
      .query(QUERY_MY_FAVORITES, variables)
      .toPromise()
      .then((r) => r.data.sessions.me.favorites);
  };

  return { toggleFavorite, queryMyFavorites, queryMyFavoriteIds };
};
