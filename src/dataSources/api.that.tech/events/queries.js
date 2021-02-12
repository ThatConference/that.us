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

  return { queryEvents };
};
