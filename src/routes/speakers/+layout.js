import auth0 from '$utils/security/client';
import speakerQueriesApi from '$dataSources/api.that.tech/speakers/queries';

export const load = auth0.withPageAuthRequired({
	load: async function load({ fetch }) {
		const { querySpeakerAcceptDownValues } = speakerQueriesApi(fetch);
		const dropDownValues = await querySpeakerAcceptDownValues();

		return {
			dropDownValues
		};
	}
});
