import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

export const MUTATION_FOLLOW_COMMUNITY_TOGGLE = `
  mutation MUTATION_FOLLOW_COMMUNITY_TOGGLE($communityId: ID) {
    communities {
      favoriting(findBy: {id: $communityId}) {
        toggle {
          id
        }
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function toggleFollow(communityId) {
		const variables = { communityId };
		return client
			.mutation({ mutation: MUTATION_FOLLOW_COMMUNITY_TOGGLE, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'mutate_community' });

				let results = false;
				if (data) {
					const { toggle } = data.communities.favoriting;
					results = !!toggle;
				}

				return results;
			});
	}

	return { toggleFollow };
};
