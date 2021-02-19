import { log } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

export const QUERY_EVENTS = `
  query QUERY_EVENTS {
    events {
      all {
        id
        name
        description
        slogan
        type  
        startDate
        endDate
        year
        slug
        community
        isFeatured
        isActive
        theme { 
          heroSlug
        }
        venues {
          city
          state
        }
      }
    }
  }
`;

export const QUERY_EVENTS_BY_COMMUNITY = `
  query QUERY_EVENTS_BY_COMMUNITY ($slug: Slug) {
    communities {
      community (findBy: {slug: $slug}) {
        get {
          events {
            id
            name
            description
            slogan
            type  
            startDate
            endDate
            year
            slug
            community
            isFeatured
            isActive
            theme { 
              heroSlug
            }
            venues {
              city
              state
            }
          }  
        }
      }
    }
  }
`;

export default client => {
  function queryEvents() {
    const variables = {};

    return client
      .query(QUERY_EVENTS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_EVENTS');

        const { all } = data.events;
        return all || [];
      });
  }

  function queryEventsByCommunity(slug = 'that') {
    const variables = { slug };

    return client
      .query(QUERY_EVENTS_BY_COMMUNITY, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_EVENTS');

        const { community } = data.communities;
        return community ? community.get.events : [];
      });
  }

  return { queryEvents, queryEventsByCommunity };
};
