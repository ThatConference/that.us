import gFetch from '$utils/gfetch';

import { log } from './utilities/error';

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
						event{
							id
							name,
							year
						}
					}
				}
			}
		}
	}
`;

export default () => {
	const client = gFetch();

	function queryMySubmissions() {
		return client
			.secureQuery({ query: QUERY_MY_SUBMISSIONS })

			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_MY_SUBMISSIONS' }); // todo.. not sure about this one.

				let results = [];
				const { submitted } = data.sessions.me;

				if (submitted) {
					results = [...submitted];
					results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
				}

				return results.reverse();
			});
	}

	return { queryMySubmissions };
};
