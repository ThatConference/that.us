import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load({ fetch }) {
	const { queryMeSharedProfile } = meQueryApi(fetch);

	let sharedProfile = await queryMeSharedProfile();
	return {
		sharedProfile
	};
}
