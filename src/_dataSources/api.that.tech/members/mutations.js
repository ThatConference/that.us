import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

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

export const MUTATION_UPDATE_EMERGENCY_CONTACT = `
	mutation MUTATION_UPDATE_EMERGENCY_CONTACT ($emergencyContact: EmergencyContactUpdateInput!) {
		members { 
			member {
				update(profile: { emergencyContact: $emergencyContact }) {
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

export const MUTATION_REQUEST_SLACK_INVITE = `
	mutation MUTATION_REQUEST_SLACK_INVITE  {
		members {
			member {
				requestSlackInvite
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function createProfile(profile) {
		const variables = { profile };
		return client.mutation({ mutation: MUTATION_CREATE, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'MUTATION_CREATE' });

			return data.members.create;
		});
	}

	function updateProfile(profile) {
		const variables = { profile };
		return client.mutation({ mutation: MUTATION_UPDATE, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'MUTATION_UPDATE' });

			return data.members.member.update;
		});
	}

	function updateEmergencyContact(emergencyContact) {
		const variables = { emergencyContact };

		return client
			.mutation({ mutation: MUTATION_UPDATE_EMERGENCY_CONTACT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_UPDATE_EMERGENCY_CONTACT' });

				return data.members?.member?.update?.emergencyContact;
			});
	}

	function claimTicket(ticketReference) {
		const variables = { ticketReference };
		return client.mutation({ mutation: CLAIM_TICKET, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'CLAIM_TICKET' });

			let claimed = null;
			if (data.members.member.claimTicket) claimed = data.members.member.claimTicket;

			return claimed;
		});
	}

	function toggleFollow(slug) {
		const variables = { target: { slug } };

		return client
			.mutation({ mutation: MUTATION_FOLLOW_MEMBER_TOGGLE, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_FOLLOW_MEMBER_TOGGLE' });

				let results = false;
				if (data) {
					const { followToggle } = data.members.member;
					results = !!followToggle;
				}

				return results;
			});
	}

	function requestSlackInvite() {
		const variables = {};

		return client
			.mutation({ mutation: MUTATION_REQUEST_SLACK_INVITE, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'MUTATION_REQUEST_SLACK_INVITE' });

				return data?.members?.member?.requestSlackInvite;
			});
	}

	return {
		createProfile,
		updateProfile,
		claimTicket,
		toggleFollow,
		requestSlackInvite,
		updateEmergencyContact
	};
};
