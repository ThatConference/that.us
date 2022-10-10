import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

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
		return client.query({ query: QUERY_COMMUNITY_STATS, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_COMMUNITY_STATS' });

			return data.communities.community.stats;
		});
	};

	return {
		queryCommunityStats
	};
};
