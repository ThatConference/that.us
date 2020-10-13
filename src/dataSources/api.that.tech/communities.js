export const QUERY_ALL_COMMUNITIES = `
  query getAllCommunities {
    communities {
      __typename
      all {
        __typename
        id
        name
        slug
        logo
      }
    }
  }
`;

export const QUERY_COMMUNITY_BY_SLUG = `
  query getCommunityBySlug($slug: Slug) {
    communities {
      __typename
      community(findBy: {slug: $slug}) {
        __typename
        get {
          __typename
          id
          name
          slug
          description
          logo
          createdAt
          tags
          followers {
            __typename
            members {
              __typename
              id
              profileSlug
              profileImage
              firstName
              lastName
            }
          }
          sessions {
            __typename
            sessions {
              __typename
              id
              title
              startTime
              speakers {
                __typename
                profileImage
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  }
`;

export default client => {
  const stripAuthorization = () => {
    const newHeaders = {
      ...client.fetchOptions().headers,
    };

    delete newHeaders.authorization;

    return newHeaders;
  };

  const queryAllCommunities = () =>
    client
      .query(QUERY_ALL_COMMUNITIES, {
        fetchOptions: { headers: { ...stripAuthorization() } },
      })
      .toPromise()
      .then(r => {
        let results = [];

        const { all } = r.data.communities;

        if (all) {
          results = all;
        }

        return results;
      });

  const queryCommunityBySlug = slug => {
    const variables = { slug };
    return client
      .query(QUERY_COMMUNITY_BY_SLUG, variables, {
        fetchOptions: { headers: { ...stripAuthorization() } },
      })
      .toPromise()
      .then(r => {
        let results = [];

        const { get } = r.data.communities.community;

        if (get) {
          results = get;
        }

        return results;
      });
  };

  return { queryAllCommunities, queryCommunityBySlug };
};
