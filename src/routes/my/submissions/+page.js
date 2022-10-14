import submissionsApi from '$dataSources/api.that.tech/submissions';

export async function load({ fetch }) {
	const { queryMySubmissions } = submissionsApi(fetch);
	let activities = await queryMySubmissions();

	return {
		activities
	};
}
