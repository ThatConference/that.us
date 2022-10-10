import submissionsApi from '$dataSources/api.that.tech/submissions';

export async function load() {
	const { queryMySubmissions } = submissionsApi();
	let activities = await queryMySubmissions();

	return {
		activities
	};
}
