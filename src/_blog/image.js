function create(slug) {
	function cdnUrl(imageName) {
		return `https://images.that.tech/blog/posts/${slug}/${imageName}?auto=format`;
	}

	return {
		cdnUrl
	};
}

export default create;
