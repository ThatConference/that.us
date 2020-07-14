import { getClient } from '@urql/svelte';
import config from '../../config';

export const QUERY_SESSIONS = `
  query GetEventsSessions ($eventId: ID!) {
    events {
      event(id: $eventId) {
        get {
          sessions {
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
  }
`;

export const querySessions = () => {
  const variables = { eventId: config.eventId };
  return getClient()
    .query(QUERY_SESSIONS, variables)
    .toPromise()
    .then((r) => r.data.events.event.get.sessions);
};
