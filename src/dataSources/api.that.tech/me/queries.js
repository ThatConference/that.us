import debug from 'debug';

const dlog = debug('that.data.api.community');

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
  dlog('created');

  const queryMeCommunityFollows = () => {
    console.log('queryMeFollowing');
    const variables = {};
    return client
      .query(QUERY_MY_COMMUNITY_FOLLOWS, variables)
      .toPromise()
      .then(r => {
        if (r.error) throw new Error(r.error);
        console.log('queryMeCommunityFollows', r);

        const { me } = r.data.communities;
        return me ? me.favorties : [];
      });
  };

  return {
    queryMeCommunityFollows,
  };
};
