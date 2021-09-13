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
      me {
        leads {
          all {
            id
            createdAt
            
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
          }
        }
      }
    }
  }   
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function queryMySponsorNetwork() {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_MY_NETWORK_SPONSORS, variables })
			.then(({ data, error }) => {
				if (error) log(error, 'QUERY_MY_NETWORK_SPONSORS');

				let results = [];
				if (data) {
					const { all } = data.partners.me.leads;
					results = all;
				}

				return results;
			});
	}

	return {
		queryMySponsorNetwork
	};
};
