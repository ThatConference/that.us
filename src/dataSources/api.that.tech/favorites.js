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

export default (client) => {
  const toggleFavorite = (eventId, sessionId) => {
    const mutationVariables = {
      eventId,
      sessionId,
    };

    return client.mutation(TOGGLE_FAVORITE, mutationVariables).toPromise();
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

  return { toggleFavorite, queryMyFavorites };
};
