import gFetch from '$utils/gFetch';
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

export default () => {
	const client = gFetch();

	function updateSharedProfile(sharedProfile) {
		const variables = { sharedProfile };
		return client
			.mutation(MUTATION_UPDATE_SHARED_PROFILE, variables)
			.toPromise()
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
