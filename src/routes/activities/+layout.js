import sessionsQueryApi from '$dataSources/api.that.tech/sessions/queries';

export async function load({ fetch }) {
	const { querySessionDropDownValues } = sessionsQueryApi(fetch);

	return {
		sessionEnumLookups: await querySessionDropDownValues()
	};
}
