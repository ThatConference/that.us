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

export default client => {
  function queryMyNetwork() {
    const variables = {};
    return client
      .query(QUERY_MY_NETWORK_SPONSORS, variables, {
        requestPolicy: 'cache-and-network',
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_MY_NETWORK_SPONSORS');

        let results = [];
        if (data) {
          const { all } = data.partners.us.leads;
          results = all;
        }

        return results;
      });
  }

  return {
    queryMyNetwork,
  };
};
