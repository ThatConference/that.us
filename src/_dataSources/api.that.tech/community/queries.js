import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

const sessionDetailsFragment = `
	fragment sessionDetailFields on PagedAcceptedSession {
		cursor
		count
		sessions {
			id
			title
			startTime
			speakers {
				profileImage
				firstName
				lastName
			}
		}    
	}
`;

export const QUERY_ALL_COMMUNITIES = `
	query QUERY_ALL_COMMUNITIES {
		communities {
			all {
				id
				name
				slug
				logo
				sessionCount
				followCount
			}
		}
	}
`;

export const QUERY_COMMUNITY_BY_SLUG = `
	query QUERY_COMMUNITY_BY_SLUG($slug: Slug) {
		communities {
			community(findBy: {slug: $slug}) {
				get {
					id
					name
					slug
					description
					logo
					tags
					createdAt
				}
			}
		}
	}
`;

export const QUERY_COMMUNITY_FOLLOWERS = `
	query QUERY_COMMUNITY_FOLLOWERS($slug: Slug) {
		communities {
			community(findBy: {slug: $slug}) {
				get {
					followCount
					followers {
						cursor
						members {
							id
							profileSlug
							profileImage
							firstName
							lastName
						}
					}
				}
			}
		}
	}
`;

export const QUERY_COMMUNITY_ACTIVITIES = `
	${sessionDetailsFragment}
	query QUERY_COMMUNITY_ACTIVITIES($slug: Slug, $asOfDate: Date, $pageSize: Int) {
		communities {
			community(findBy: {slug: $slug}) {
				get {
					sessions(asOfDate: $asOfDate, pageSize: $pageSize) {
						...sessionDetailFields
					}
				}
			}
		}
	}
`;

export const QUERY_NEXT_COMMUNITY_ACTIVITIES = `
	${sessionDetailsFragment}
	query QUERY_NEXT_COMMUNITY_ACTIVITIES($id: ID, $asOfDate: Date, $pageSize: Int, $cursor: String) {
		communities {
			community(findBy: {id: $id}) {
				get {
					sessions(asOfDate: $asOfDate, pageSize: $pageSize, cursor: $cursor) {
						...sessionDetailFields
					}
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const queryAllCommunities = () =>
		client.query({ query: QUERY_ALL_COMMUNITIES }).then(({ data, error }) => {
			if (error) log(error, 'QUERY_ALL_COMMUNITIES');

			const { communities } = data;
			return communities ? communities.all : [];
		});

	// TODO stub function until we have paged communities
	const queryNextAllCommunities = () => null;

	const queryCommunityBySlug = (slug) => {
		const variables = { slug };
		return client.query({ query: QUERY_COMMUNITY_BY_SLUG, variables }).then(({ data, error }) => {
			if (error) log(error, 'QUERY_COMMUNITY_BY_SLUG');

			const { community } = data.communities;
			return community ? community.get : null;
		});
	};

	const queryCommunityActivities = ({ slug, asOfDate = new Date(), pageSize = 6 }) => {
		const variables = { slug, asOfDate, pageSize };

		return client
			.query({ query: QUERY_COMMUNITY_ACTIVITIES, variables })
			.then(({ data, error }) => {
				if (error) log(error, 'QUERY_COMMUNITY_ACTIVITIES');

				const { community } = data.communities;
				return community ? community.get.sessions : [];
			});
	};

	const queryNextCommunityActivities = ({ id, asOfDate = new Date(), pageSize = 6, cursor }) => {
		const variables = { id, asOfDate, pageSize, cursor };
		return client
			.query({ query: QUERY_NEXT_COMMUNITY_ACTIVITIES, variables })
			.then(({ data, error }) => {
				if (error) log(error, 'QUERY_NEXT_COMMUNITY_ACTIVITIES');

				const { community } = data.communities;
				return community ? community.get.sessions : [];
			});
	};

	const queryCommunityFollowers = (slug) => {
		const variables = { slug };
		return client.query({ query: QUERY_COMMUNITY_FOLLOWERS, variables }).then(({ data, error }) => {
			if (error) log(error, 'QUERY_COMMUNITY_FOLLOWERS');

			const { community } = data.communities;
			return community ? community.get : []; // followerCount and followers are in get
		});
	};

	return {
		queryAllCommunities,
		queryNextAllCommunities,
		queryCommunityBySlug,
		queryCommunityActivities,
		queryNextCommunityActivities,
		queryCommunityFollowers
	};
};
