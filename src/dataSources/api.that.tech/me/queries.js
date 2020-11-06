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
      .then(r => {
        if (r.error) throw new Error(r.error);

        const { me } = r.data.communities;
        return me ? me.favorites.ids : [];
      });
  };

  const queryMeFollowingMembers = () => {
    const variables = {};
    return client
      .query(QUERY_ME_FOLLOWING_MEMBERS, variables)
      .toPromise()
      .then(r => {
        if (r.error) throw new Error(r.error);

        const { me } = r.data.members;
        return me ? me.following.ids : [];
      });
  };

  const queryMeFollowingPartners = () => {
    const variables = {};
    return client
      .query(QUERY_ME_FOLLOWING_PARTNERS, variables)
      .toPromise()
      .then(r => {
        if (r.error) throw new Error(r.error);

        const { me } = r.data.partners;
        return me ? me.favorites.ids : [];
      });
  };

  return {
    queryMeFollowingCommunities,
    queryMeFollowingMembers,
    queryMeFollowingPartners,
  };
};
