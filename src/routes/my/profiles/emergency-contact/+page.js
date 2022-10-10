import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load() {
	const { queryMeEmergencyContact } = meQueryApi();

	let emergencyContactInformation = await queryMeEmergencyContact();
	return {
		emergencyContactInformation
	};
}
