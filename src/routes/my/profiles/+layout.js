import meQueriesApi from '$dataSources/api.that.tech/me/queries';

export async function load({ fetch }) {
	const { queryDropDownValues } = meQueriesApi(fetch);
	const dropDownValues = await queryDropDownValues();

	return {
		dropDownValues
	};
}
