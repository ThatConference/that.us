const userFragment = `
  fragment memberFields on PublicProfile {
    __typename
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
      __typename
      isPublic
      linkType
      url
    }
    earnedMeritBadges {
      __typename
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
        __typename
        members (pageSize: $pageSize, orderBy:CREATEDAT) {
          __typename
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
        __typename
        members (pageSize: $pageSize, after: $after, orderBy:CREATEDAT) {
          __typename
          cursor
          members {
            ...memberFields
          }
        }
      }
    }
`;

const profileFieldsFragment = `
  fragment profileFields on Profile {
    __typename
    id
    firstName
    lastName
    email
    company
    jobTitle
    profileImage
    profileSlug
    bio
    profileLinks {
      __typename
      isPublic
      linkType
      url
    }
    earnedMeritBadges {
      __typename
      id
      name
      image
      description
    }
    canFeature
    isOver13
    acceptedCodeOfConduct
    acceptedTermsOfService
    acceptedAntiHarassmentPolicy
    acceptedCommitmentToDiversity
    isDeactivated
    interests
    lifeHack
  }
`;

export const MUTATION_CREATE = `
  ${profileFieldsFragment}
  mutation createMember ($profile: ProfileCreateInput!) {
    members {
      __typename
      create(profile: $profile) {
        ...profileFields
      }
    }
  }
  `;

export const MUTATION_UPDATE = `
  ${profileFieldsFragment}
  mutation updateMember ($profile: ProfileUpdateInput!) {
    members {
      __typename 
      member {
        __typename
      update(profile: $profile) {
          ...profileFields
        }
      }
    }
  }
`;

export const QUERY_IS_SLUG_TAKEN = `
  query slugCheck($slug: Slug!) {
    members {
      __typename
     isProfileSlugTaken(slug: $slug)
    }
  }
`;

export const CLAIM_TICKET = `
  mutation claimMyTicket($ticketReference: String!) {
    members {
      __typename
      member {
        __typename
        claimTicket(ticketRef: $ticketReference)  {
          __typename
          id
          name
          image
          description
        }
      }
    }
  }
`;

export const QUERY_MEMBER_BY_SLUG = `
  query getMemberBySlug ($slug: Slug!, $sessionStartDate: Date, $filter: AcceptedSessionFilter) {
    members {
      __typename
      member(slug: $slug) {
        __typename
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
          __typename
          linkType
          url
        }
        earnedMeritBadges {
          __typename
          name
          image
        }
        sessions(filter: $filter, asOfDate: $sessionStartDate) {
          __typename
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

export default client => {
  const stripAuthorization = () => {
    const newHeaders = {
      ...client.fetchOptions().headers,
    };

    delete newHeaders.authorization;

    return newHeaders;
  };

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
        fetchOptions: { headers: { ...stripAuthorization() } },
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
        fetchOptions: { headers: { ...stripAuthorization() } },
      })
      .toPromise()
      .then(r => r.data.members.member);
  };

  const queryMembersNext = (after, pageSize = 50) => {
    const variables = { pageSize, after };
    return client
      .query(QUERY_MEMBERS_NEXT, variables, {
        fetchOptions: { headers: { ...stripAuthorization() } },
      })
      .toPromise()
      .then(reformatResults);
  };

  const createProfile = profile => {
    const variables = { profile };
    return client
      .mutation(MUTATION_CREATE, variables)
      .toPromise()
      .then(r => r.data.members.create);
  };

  const updateProfile = profile => {
    const variables = { profile };
    return client
      .mutation(MUTATION_UPDATE, variables)
      .toPromise()
      .then(r => r.data.members.member.update);
  };

  const claimTicket = ticketReference => {
    const variables = { ticketReference };
    return client
      .mutation(CLAIM_TICKET, variables)
      .toPromise()
      .then(r => {
        let claimed = null;

        if (r.error) {
          // todo... someday log
          console.error(r.error);
        } else if (r.data.members.member.claimTicket)
          claimed = r.data.members.member.claimTicket;

        return claimed;
      });
  };

  return {
    queryMembers,
    queryMembersNext,
    queryMemberBySlug,
    createProfile,
    updateProfile,
    isSlugTaken,
    claimTicket,
  };
};
