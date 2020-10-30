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

export default client => {
  const queryMeCommunityFollows = () => {
    const variables = {};
    return client
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
