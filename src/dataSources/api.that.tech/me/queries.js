import { getClient } from '@urql/svelte';

export const QUERY_MY_COMMUNITY_FOLLOWS = `
  query queryMyCommunityFollows {
    communities {
      me {
        favorites {
          ids
        }
      }
    }
  }
`;

export default () => {
  const queryMeCommunityFollows = () => {
    const variables = {};
    return getClient()
      .query(QUERY_MY_COMMUNITY_FOLLOWS, variables)
      .toPromise()
      .then(r => {
        if (r.error) throw new Error(r.error);

        const { me } = r.data.communities;
        return me ? me.favorites.ids : [];
      });
  };

  return {
    queryMeCommunityFollows,
  };
};
