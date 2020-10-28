import { getClient } from '@urql/svelte';

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

export default () => {
  const createProfile = profile => {
    const variables = { profile };
    return getClient()
      .mutation(MUTATION_CREATE, variables)
      .toPromise()
      .then(r => r.data.members.create);
  };

  const updateProfile = profile => {
    const variables = { profile };
    return getClient()
      .mutation(MUTATION_UPDATE, variables)
      .toPromise()
      .then(r => r.data.members.member.update);
  };

  const claimTicket = ticketReference => {
    const variables = { ticketReference };
    return getClient()
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
    createProfile,
    updateProfile,
    claimTicket,
  };
};
