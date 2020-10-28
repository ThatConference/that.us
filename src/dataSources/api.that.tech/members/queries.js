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

function reformatResults(results) {
  const { members } = results.data.members;
  return members;
}

const stripAuthorization = client => {
  const newHeaders = {
    ...client.fetchOptions().headers,
  };

  delete newHeaders.authorization;

  return newHeaders;
};

export default client => {
  const isSlugTaken = slug => {
    const variables = { slug };
    return client
      .query(QUERY_IS_SLUG_TAKEN, variables)
      .toPromise()
      .then(r => {
        let isTaken;

        if (r.error) isTaken = true;
        else if (r.data) isTaken = r.data.members.isProfileSlugTaken;

        return isTaken;
      });
  };

  const queryMembers = (pageSize = 50) => {
    const variables = { pageSize };
    return client
      .query(QUERY_MEMBERS_INITAL, variables, {
        fetchOptions: { headers: { ...stripAuthorization(client) } },
      })
      .toPromise()
      .then(reformatResults);
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
        fetchOptions: { headers: { ...stripAuthorization(client) } },
      })
      .toPromise()
      .then(r => r.data.members.member);
  };

  const queryMembersNext = async (after, pageSize = 50) => {
    const variables = { pageSize, after };
    return client
      .query(QUERY_MEMBERS_NEXT, variables, {
        fetchOptions: { headers: { ...stripAuthorization(client) } },
      })
      .toPromise()
      .then(reformatResults);
  };

  return {
    queryMembers,
    queryMembersNext,
    queryMemberBySlug,
    isSlugTaken,
  };
};
