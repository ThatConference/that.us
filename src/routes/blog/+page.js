import { getPosts } from '$blog/getPosts';
import membersQueryApi from '$dataSources/api.that.tech/members/queries';

export async function load() {
	const { queryBlogAuthorBySlug } = membersQueryApi();
	const rawPosts = getPosts();

	let posts = await Promise.all(
		rawPosts.map(async (p) => {
			const author = await queryBlogAuthorBySlug(p.metadata.authorSlug);

			return {
				...p,
				metadata: {
					...p.metadata,
					author
				}
			};
		})
	);

	return {
		posts
	};
}
