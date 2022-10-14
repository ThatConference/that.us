import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load({ fetch }) {
	const { queryMeEmergencyContact } = meQueryApi(fetch);

	let emergencyContactInformation = await queryMeEmergencyContact();
	return {
		emergencyContactInformation
	};
}
