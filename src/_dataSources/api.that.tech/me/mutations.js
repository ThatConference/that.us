import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

export const MUTATION_UPDATE_SHARED_PROFILE = `
  mutation MUTATION_UPDATE_SHARED_PROFILE ($sharedProfile: SharedProfileUpdateInput!) {
    members {
      member {
        profiles {
          shared {
            update (profile: $sharedProfile) {
              id
              firstName
              lastName
              email
              phone
              city
              state
            }
          }
        }
      }
    }
  }
`;
export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function updateSharedProfile(sharedProfile) {
		const variables = { sharedProfile };
		return client
			.mutation({ mutation: MUTATION_UPDATE_SHARED_PROFILE, variables })
			.then(({ data, error }) => {
				if (error) log(error, 'MUTATION_CHECK_IN_USER');

				let results;

				if (data) {
					const { update } = data.members.member.profiles.shared;
					results = update;
				}

				return results;
			});
	}

	return { updateSharedProfile };
};
