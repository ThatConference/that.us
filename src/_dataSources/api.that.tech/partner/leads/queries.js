import gFetch from '$utils/gfetch';
import { log } from '../../utilities/error';

const sharedProfileFragment = `
	fragment sharedProfileFragment on SharedProfile {  
		id
		firstName
		lastName
		email
		phone
	}
`;

const QUERY_MY_NETWORK_SPONSORS = `
	${sharedProfileFragment}
	query QUERY_MY_NETWORK_SPONSORS {
		partners {
			us {
				leads {
					all {
						id
						createdAt
						partnerPin
						partnersNotes
						
						partner {
							companyName
							companyLogo
							slug
						}
						
						event {
							name
							slug
							logo
						}
						
						partnerContact {
							...sharedProfileFragment
						}

						member {
							...sharedProfileFragment
						}
					}
				}
			}
		}
	}   
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function queryMyNetwork() {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_MY_NETWORK_SPONSORS, variables })
			.then((apiResults) => {
				console.log('results from api', apiResults);
				// if (error) log(error, 'QUERY_MY_NETWORK_SPONSORS');

				let results = [];
				if (apiResults.data) {
					const { all } = apiResults?.data?.partners?.us?.leads;
					results = all;
				}

				return results || [];
			});
	}

	return {
		queryMyNetwork
	};
};
