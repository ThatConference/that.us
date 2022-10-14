import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load({ fetch }) {
	const { queryMeDiscountCodes } = meQueryApi(fetch);
	let codes = await queryMeDiscountCodes();

	return {
		codes
	};
}
