import { getClient } from '@urql/svelte';
import config from '../../config';

export const QUERY_SUBMISSIONS = `
  query getMySubmissions {
    sessions {
      me {
        submitted {      
          ... on Base {
            id
            eventId
            type
            status
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

export const queryMySubmissions = () => {
  const variables = { eventId: config.eventId };
  return getClient()
    .query(QUERY_SUBMISSIONS, variables)
    .toPromise()
    .then((r) => {
      const { submitted } = r.data.sessions.me;

      return submitted
        .filter((s) => s.type === 'OPEN_SPACE')
        .filter((s) => s.eventId === config.eventId);
    });
};
