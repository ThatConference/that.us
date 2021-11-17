export function getPosts({ limit } = {}) {
	const posts = Object.entries(import.meta.globEager('./posts/**/*.md'))
		.map(([, post]) => ({ metadata: post.metadata, component: post.default }))
		// sort by date
		.sort((a, b) => {
			return new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime() ? 1 : -1;
		});

	if (limit) {
		console.log(limit);
		return posts.slice(0, limit);
	}

	return posts;
}
