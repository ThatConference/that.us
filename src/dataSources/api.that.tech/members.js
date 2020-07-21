const pageSize = 50;

const userFragment = `
  fragment memberFields on PublicProfile {
    id
    firstName
    lastName
    company
    jobTitle
    profileImage
    profileSlug
    profileLinks {
      linkType
      url
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

const profileFieldsFragment = `
  fragment profileFields on Profile {
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
      linkType
      url
    }
    canFeature
    isOver13
    acceptedCodeOfConduct
    acceptedTermsOfService
    acceptedAntiHarassmentPolicy
    acceptedCommitmentToDiversity
    isDeactivated
  }
`;

export const MUTATION_CREATE = `
  ${profileFieldsFragment}
  mutation createMember ($profile: ProfileCreateInput!) {
    members {
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
      member {
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
     isProfileSlugTaken(slug: $slug)
    }
  }
`;

function reformatResults(results) {
  const { members } = results.data.members;
  return members;
}

export default (client) => {
  const isSlugTaken = (slug) => {
    const variables = { slug };
    return client
      .query(QUERY_IS_SLUG_TAKEN, variables)
      .toPromise()
      .then((r) => {
        let isTaken;

        if (r.error) isTaken = true;
        else if (r.data) isTaken = r.data.members.isProfileSlugTaken;

        return isTaken;
      });
  };

  const queryMembers = () => {
    const variables = { pageSize };
    return client
      .query(QUERY_MEMBERS_INITAL, variables)
      .toPromise()
      .then(reformatResults);
  };

  const queryMembersNext = (after) => {
    const variables = { pageSize, after };
    return client
      .query(QUERY_MEMBERS_NEXT, variables)
      .toPromise()
      .then(reformatResults);
  };

  const createProfile = (profile) => {
    const variables = { profile };
    return client
      .mutation(MUTATION_CREATE, variables)
      .toPromise()
      .then((r) => r.data.members.create);
  };

  const updateProfile = (profile) => {
    const variables = { profile };
    return client
      .mutation(MUTATION_UPDATE, variables)
      .toPromise()
      .then((r) => r.data.members.member.update);
  };

  return {
    queryMembers,
    queryMembersNext,
    createProfile,
    updateProfile,

    isSlugTaken,
  };
};
