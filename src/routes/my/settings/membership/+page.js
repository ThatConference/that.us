import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load() {
	const { queryMeDiscountCodes } = meQueryApi();
	let codes = await queryMeDiscountCodes();

	return {
		codes
	};
}
