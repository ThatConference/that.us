import { error } from '@sveltejs/kit';
import { getPosts } from '$blog/getPosts';
import membersQueryApi from '$dataSources/api.that.tech/members/queries';

export async function load({ params, fetch }) {
	const { slug } = params;
	const { queryBlogAuthorBySlug } = membersQueryApi(fetch);

	const post = getPosts().find((post) => slug === post.metadata.slug);
	const author = await queryBlogAuthorBySlug(post.metadata.authorSlug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		author,
		...post.metadata,
		next: post.next?.metadata,
		previous: post.previous?.metadata,
		component: post.component,
		heroImage: post.metadata.heroImage,
		slug
	};
}
