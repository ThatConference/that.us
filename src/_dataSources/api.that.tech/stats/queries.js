import { logMessage } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

export const QUERY_COMMUNITY_STATS = `
  query getCommunityStats($community: CommunityQueryInput!) {
    communities {
      community(findBy: $community) {
        stats {
          pastActivities
          totalMembers
          hoursServed
        }
      }
    }
  }
`;

export default client => {
  const queryCommunityStats = (slug = 'that') => {
    const variables = { community: { slug } };
    return client
      .query(QUERY_COMMUNITY_STATS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) logMessage(error, 'query_favorites');

        return data.communities.community.stats;
      });
  };

  return {
    queryCommunityStats,
  };
};
