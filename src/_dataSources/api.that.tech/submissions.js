import gFetch from '$utils/gfetch';

import { logMessage } from './utilities/error';

export const QUERY_MY_SUBMISSIONS = `
  query QUERY_MY_SUBMISSIONS {
    sessions {
      me {
        submitted {
          ... on Base {
            id
            eventId
            type
            title
            shortDescription
            startTime
            durationInMinutes
            status
            tags         
            createdAt
            lastUpdatedAt   
          }
        }
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const queryMySubmissions = () =>
		client
			.secureQuery({ query: QUERY_MY_SUBMISSIONS })

			.then(({ data, error }) => {
				if (error) logMessage(error, 'QUERY_MY_SUBMISSIONS'); // todo.. not sure about this one.

				let results = [];
				const { submitted } = data.sessions.me;

				if (submitted) {
					results = [...submitted];
					results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
				}

				return results.reverse();
			});

	return { queryMySubmissions };
};
