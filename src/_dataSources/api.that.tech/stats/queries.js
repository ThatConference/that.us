import gFetch from '$utils/gfetch';

import { logMessage } from '../utilities/error';

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

export default () => {
	const client = gFetch();

	const queryCommunityStats = (slug = 'that') => {
		const variables = { community: { slug } };
		return client.query({ query: QUERY_COMMUNITY_STATS, variables }).then(({ data, error }) => {
			if (error) logMessage(error, 'query_favorites');

			return data.communities.community.stats;
		});
	};

	return {
		queryCommunityStats
	};
};
