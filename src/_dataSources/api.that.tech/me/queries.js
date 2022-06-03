import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

const enumValues = `
	options: enumValues {
		label: description
		value: name
	}
`;

export const QUERY_DROPDOWN_VALUES = `
	query QUERY_DROPDOWN_VALUES {
		countryCode: __type(name: "CountryCode") {
			${enumValues}
		}
	}
`;

export const QUERY_ME_FOLLOWING_COMMUNITIES = `
  query queryMyCommunityFollows {
    communities {
      me {
				id
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
				id
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

export const QUERY_ME_DISCOUNT_CODES = `
  query queryMeDiscountCodes {
    members {
      me {
				id
        discountCodes {
          id
          title
          code
          type
          createdAt
          expiresAt
        }
      }
    }
  }
`;

export const QUERY_ME_SHARED_PROFILE = `
  query QUERY_ME_SHARED_PROFILE {
    members {
      profiles {
        shared {
          id
          firstName
          lastName
          email
          city
          state
					country
					phone
					company
        }
      }
    }
  }
`;

export const QUERY_ME_EMERGENCY_CONTACT = `
  query QUERY_ME_EMERGENCY_CONTACT {
    members {
      me {
				id
        emergencyContact {
					fullName
					phoneNumber
					email
					relationship
					travelingWithYou
        }
      }
    }
  }
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const queryMeFollowingCommunities = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_FOLLOWING_COMMUNITIES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_FOLLOWING_COMMUNITIES' });

				const { me } = data.communities;
				return me ? me.favorites.ids : [];
			});
	};

	const queryMeFollowingMembers = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_FOLLOWING_MEMBERS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_FOLLOWING_MEMBERS' });

				const { me } = data.members;
				return me ? me?.following?.ids : [];
			});
	};

	const queryMeFollowingPartners = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_FOLLOWING_PARTNERS, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_FOLLOWING_PARTNERS' });

				const { me } = data.partners;
				return me ? me.favorites.ids : [];
			});
	};

	const queryMeDiscountCodes = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_DISCOUNT_CODES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_DISCOUNT_CODES' });

				const { discountCodes } = data.members.me;
				return discountCodes || [];
			});
	};

	const queryMeSharedProfile = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_SHARED_PROFILE, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_SHARED_PROFILE' });

				const { shared } = data.members.profiles;

				return shared;
			});
	};

	const queryMeEmergencyContact = () => {
		const variables = {};
		return client
			.secureQuery({ query: QUERY_ME_EMERGENCY_CONTACT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_ME_EMERGENCY_CONTACT' });
				return data.members?.me?.emergencyContact;
			});
	};

	function queryDropDownValues() {
		const variables = {};

		return client.query({ query: QUERY_DROPDOWN_VALUES, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_DROPDOWN_VALUES' });

			return data;
		});
	}

	return {
		queryMeFollowingCommunities,
		queryMeFollowingMembers,
		queryMeFollowingPartners,
		queryMeDiscountCodes,
		queryMeSharedProfile,
		queryMeEmergencyContact,
		queryDropDownValues
	};
};
