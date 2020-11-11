import { log } from '../utilities/error';

export const QUERY_ME_FOLLOWING_COMMUNITIES = `
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

export const QUERY_ME_FOLLOWING_MEMBERS = `
  query queryMyMemberFollowing {
    members {
      me {
        following {
          ids
        }
      }
    }
  }
`;

export const QUERY_ME_FOLLOWING_PARTNERS = `
  query queryMyCommunityFollows {
    partners {
      me {
        favorites {
          ids
        }
      }
    }
  }
`;

export default client => {
  const queryMeFollowingCommunities = () => {
    const variables = {};
    return client
      .query(QUERY_ME_FOLLOWING_COMMUNITIES, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_me');

        const { me } = data.communities;
        return me ? me.favorites.ids : [];
      });
  };

  const queryMeFollowingMembers = () => {
    const variables = {};
    return client
      .query(QUERY_ME_FOLLOWING_MEMBERS, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_me');

        const { me } = data.members;
        return me ? me.following.ids : [];
      });
  };

  const queryMeFollowingPartners = () => {
    const variables = {};
    return client
      .query(QUERY_ME_FOLLOWING_PARTNERS, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_me');

        const { me } = data.partners;
        return me ? me.favorites.ids : [];
      });
  };

  return {
    queryMeFollowingCommunities,
    queryMeFollowingMembers,
    queryMeFollowingPartners,
  };
};
