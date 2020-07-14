import { getClient } from '@urql/svelte';
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

export const toggleFavorite = (eventId, sessionId) => {
  const mutationVariables = {
    eventId,
    sessionId,
  };

  return getClient().mutation(TOGGLE_FAVORITE, mutationVariables).toPromise();
};

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

export const queryMyFavorites = () => {
  const variables = {
    eventId: config.eventId,
  };

  return getClient()
    .query(QUERY_MY_FAVORITES, variables)
    .toPromise()
    .then((r) => r.data.sessions.me.favorites);
};
