import * as Sentry from '@sentry/browser';

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

export const CLAIM_TICKET = `
  mutation claimMyTicket($ticketReference: String!) {
    members {
      member {
        claimTicket(ticketRef: $ticketReference)  {
          id
          name
          image
          description
        }
      }
    }
  }
`;

export const MUTATION_FOLLOW_MEMBER_TOGGLE = `
  mutation followPartner($target: FindMemberInput!) {
    members {
      member {
        followToggle(target: $target) {
          id
          profileSlug
        }
      }
    }
  }
`;

export default client => {
  const createProfile = profile => {
    const variables = { profile };
    return client
      .mutation(MUTATION_CREATE, variables)
      .toPromise()
      .then(r => {
        if (r.error) {
          Sentry.captureException(new Error(r.error), {
            tags: {
              api_that_tech: 'mutation_members',
            },
          });
        }

        return r.data.members.create;
      });
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
          Sentry.captureException(new Error(r.error), {
            tags: {
              api_that_tech: 'mutation_members',
            },
          });
        }

        if (r.data.members.member.claimTicket)
          claimed = r.data.members.member.claimTicket;

        return claimed;
      });
  };

  function toggleFollow(slug) {
    const variables = { target: { slug } };
    return client
      .mutation(MUTATION_FOLLOW_MEMBER_TOGGLE, variables)
      .toPromise()
      .then(({ data, error }) => {
        if (error) {
          Sentry.captureException(new Error(error), {
            tags: {
              api_that_tech: 'mutation_members',
            },
          });
        }

        let results = false;

        if (data) {
          const { followToggle } = data.members.member;
          results = !!followToggle;
        }

        return results;
      });
  }

  return {
    createProfile,
    updateProfile,
    claimTicket,
    toggleFollow,
  };
};
