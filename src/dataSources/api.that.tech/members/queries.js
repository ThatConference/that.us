import { log } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

const userFragment = `
  fragment memberFields on PublicProfile {
    id
    firstName
    lastName
    company
    jobTitle
    profileImage
    profileSlug
    lifeHack
    interests
    profileLinks {
      isPublic
      linkType
      url
    }
    earnedMeritBadges {
      id
      name
      image
      description
    }    
  }
`;

export const QUERY_MEMBERS_INITAL = `
    ${userFragment}
    query getAllMembersPaged($pageSize: Int) {
      members {
        members (pageSize: $pageSize, orderBy:CREATEDAT) {
          cursor
          members {
            ...memberFields
          }
        }
      }
    }
`;

export const QUERY_MEMBERS_NEXT = `
    ${userFragment}
    query getAllMembersPaged($pageSize: Int, $after: String) {
      members {
        members (pageSize: $pageSize, after: $after, orderBy:CREATEDAT) {
          cursor
          members {
            ...memberFields
          }
        }
      }
    }
`;

export const QUERY_IS_SLUG_TAKEN = `
  query slugCheck($slug: Slug!) {
    members {
     isProfileSlugTaken(slug: $slug)
    }
  }
`;

export const QUERY_MEMBER_BY_SLUG = `
  query getMemberBySlug ($slug: Slug!, $sessionStartDate: Date, $filter: AcceptedSessionFilter) {
    members {
      member(slug: $slug) {
        id
        firstName
        lastName
        bio
        company
        jobTitle
        profileSlug
        profileImage
        interests
        lifeHack
        createdAt
        profileLinks {
          linkType
          url
        }
        earnedMeritBadges {
          name
          image
        }
        sessions(filter: $filter, asOfDate: $sessionStartDate) {
          id
          title
          startTime
          shortDescription
        }
      }
    }
  }
`;

export const QUERY_MEMBER_ACTIVITIES = `
  query getMemberActivities ($slug: Slug!, $sessionStartDate: Date, $filter: AcceptedSessionFilter) {
    members {
      member(slug: $slug) {
        sessions(filter: $filter, asOfDate: $sessionStartDate) {
          id
          title
          startTime
          shortDescription
        }
      }
    }
  }
`;

export const QUERY_FOLLOWERS = `
  query queryMemberFollowers($slug: Slug!) {
    members {
      member(slug: $slug) {
        followCount
        followers {
          cursor
          profiles {
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
`;

export const QUERY_NEXT_FOLLOWERS = `
  query queryNextMemberFollowers($slug: Slug!, $cursor: String) {
    members {
      member(slug: $slug) {
        followers(cursor: $cursor) {
          cursor
          profiles {
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
`;

export default client => {
  const isSlugTaken = slug => {
    const variables = { slug };
    return client
      .query(QUERY_IS_SLUG_TAKEN, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        let isTaken = true;
        if (data) isTaken = data.members.isProfileSlugTaken;
        return isTaken;
      });
  };

  const queryMembers = (pageSize = 50) => {
    const variables = { pageSize };
    return client
      .query(QUERY_MEMBERS_INITAL, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        let results = null;
        if (data) {
          const { members } = data.members;
          results = members;
        }

        return results;
      });
  };

  const queryMembersNext = (after, pageSize = 50) => {
    const variables = { pageSize, after };
    return client
      .query(QUERY_MEMBERS_NEXT, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        let results = null;
        if (data) {
          const { members } = data.members;
          results = members;
        }

        return results;
      });
  };

  const queryMemberBySlug = (
    slug,
    sessionStartDate = new Date(new Date().setHours(0, 0, 0, 0)),
    filter = 'UPCOMING',
  ) => {
    const variables = {
      slug,
      sessionStartDate,
      filter,
    };
    return client
      .query(QUERY_MEMBER_BY_SLUG, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        return data.members.member;
      });
  };

  const queryMemberActivities = (
    slug,
    sessionStartDate = new Date(new Date().setHours(0, 0, 0, 0)),
    filter = 'UPCOMING',
  ) => {
    const variables = {
      slug,
      sessionStartDate,
      filter,
    };
    return client
      .query(QUERY_MEMBER_ACTIVITIES, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        return data.members.member.sessions;
      });
  };

  const queryNextMemberActivities = (
    slug,
    sessionStartDate = new Date(new Date().setHours(0, 0, 0, 0)),
    filter = 'UPCOMING',
  ) => {
    const variables = {
      slug,
      sessionStartDate,
      filter,
    };
    return client
      .query(QUERY_MEMBER_ACTIVITIES, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        return data.members.member.sessions;
      });
  };

  const queryFollowers = slug => {
    const variables = { slug };

    return client
      .query(QUERY_FOLLOWERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        const { member } = data.members;

        return member || null; // followerCount and followers are in partner
      });
  };

  const queryNextFollowers = (id, cursor) => {
    const variables = { id, cursor };
    return client
      .query(QUERY_NEXT_FOLLOWERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_members');

        const { member } = data.members;
        return member || null;
      });
  };

  return {
    queryMembers,
    queryMembersNext,
    queryMemberBySlug,
    queryMemberActivities,
    queryNextMemberActivities,
    queryFollowers,
    queryNextFollowers,
    isSlugTaken,
  };
};
