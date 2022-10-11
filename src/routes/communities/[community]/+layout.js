import communityQueryApi from '$dataSources/api.that.tech/community/queries';

export async function load({ params }) {
	const { community } = params;
	const { queryCommunityBySlug, queryCommunityFollowers, queryCommunityActivities } =
		communityQueryApi();

	const [communityDetails, communityFollowers, communityActivities] = await Promise.all([
		queryCommunityBySlug(community),
		queryCommunityFollowers(community),
		queryCommunityActivities({ slug: community })
	]);

	return {
		communityDetails,
		communityFollowers: communityFollowers.followers.members,
		communityActivities: communityActivities.sessions
	};
}
