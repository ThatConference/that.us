import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load() {
	const { queryMeSharedProfile } = meQueryApi();

	let sharedProfile = await queryMeSharedProfile();
	return {
		sharedProfile
	};
}
