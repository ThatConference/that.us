import { log } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

const sessionDetailsFragment = `
  fragment sessionDetailFields on PagedAcceptedSession {
    cursor
    count
    sessions {
      id
      title
      startTime
      speakers {
        profileImage
        firstName
        lastName
      }
    }    
  }
`;

export const QUERY_ALL_COMMUNITIES = `
  query queryAllCommunities {
    communities {
      all {
        id
        name
        slug
        logo
        sessionCount
        followCount
      }
    }
  }
`;

export const QUERY_COMMUNITY_BY_SLUG = `
  query queryCommunityBySlug($slug: Slug) {
    communities {
      community(findBy: {slug: $slug}) {
        get {
          id
          name
          slug
          description
          logo
          tags
          createdAt
        }
      }
    }
  }
`;

export const QUERY_COMMUNITY_FOLLOWERS = `
  query queryCommunityFollowersById($id: ID) {
    communities {
      community(findBy: {id: $id}) {
        get {
          followCount
          followers {
            cursor
            members {
              id
              profileSlug
              profileImage
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export const QUERY_COMMUNITY_ACTIVITIES = `
  ${sessionDetailsFragment}
  query queryCommunityActivitiesById($id: ID, $asOfDate: Date, $pageSize: Int) {
    communities {
      community(findBy: {id: $id}) {
        get {
          sessions(asOfDate: $asOfDate, pageSize: $pageSize) {
            ...sessionDetailFields
          }
        }
      }
    }
  }
`;

export const QUERY_NEXT_COMMUNITY_ACTIVITIES = `
  ${sessionDetailsFragment}
  query queryCommunityActivitiesById($id: ID, $asOfDate: Date, $pageSize: Int, $cursor: String) {
    communities {
      community(findBy: {id: $id}) {
        get {
          sessions(asOfDate: $asOfDate, pageSize: $pageSize, cursor: $cursor) {
            ...sessionDetailFields
          }
        }
      }
    }
  }
`;

export default client => {
  const queryAllCommunities = () =>
    client
      .query(QUERY_ALL_COMMUNITIES, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_community');

        const { communities } = data;
        return communities ? communities.all : [];
      });

  // TODO stub function until we have paged communities
  const queryNextAllCommunities = () => null;

  const queryCommunityBySlug = slug => {
    const variables = { slug };
    return client
      .query(QUERY_COMMUNITY_BY_SLUG, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_community');

        const { community } = data.communities;
        return community ? community.get : null;
      });
  };

  const queryCommunityActivities = ({
    id,
    asOfDate = new Date(),
    pageSize = 6,
  }) => {
    const variables = { id, asOfDate, pageSize };
    return client
      .query(QUERY_COMMUNITY_ACTIVITIES, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_community');

        const { community } = data.communities;
        return community ? community.get.sessions : [];
      });
  };

  const queryNextCommunityActivities = ({
    id,
    asOfDate = new Date(),
    pageSize = 6,
    cursor,
  }) => {
    const variables = { id, asOfDate, pageSize, cursor };
    return client
      .query(QUERY_NEXT_COMMUNITY_ACTIVITIES, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_community');

        const { community } = data.communities;
        return community ? community.get.sessions : [];
      });
  };

  const queryCommunityFollowers = id => {
    const variables = { id };
    return client
      .query(QUERY_COMMUNITY_FOLLOWERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_community');

        const { community } = data.communities;
        return community ? community.get : []; // followerCount and followers are in get
      });
  };

  return {
    queryAllCommunities,
    queryNextAllCommunities,
    queryCommunityBySlug,
    queryCommunityActivities,
    queryNextCommunityActivities,
    queryCommunityFollowers,
  };
};
