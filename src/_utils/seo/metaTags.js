import config from '$utils/config.public';

function createOgImagePaths({ imageId = undefined, imageUrl = undefined, ogImages = undefined }) {
	const basePath = '/images/og-images';

	let twitter = `${basePath}/twitter.jpg`;
	let facebook = `${basePath}/facebook.jpg`;
	let linkedIn = `${basePath}/linkedIn.jpg`;
	let defaultImage = `${basePath}/linkedIn.jpg`;

	if (imageId) {
		twitter = `${config.hostURL}/api/og-image/${imageId}`;
		facebook = `${config.hostURL}/api/og-image/${imageId}`;
		linkedIn = `${config.hostURL}/api/og-image/${imageId}`;
		defaultImage = `${config.hostURL}/api/og-image/${imageId}`;
	}

	if (imageUrl) {
		twitter = imageUrl;
		facebook = imageUrl;
		linkedIn = imageUrl;
		defaultImage = imageUrl;
	}

	if (ogImages) {
		twitter = `${basePath}/${ogImages.twitter}`;
		facebook = `${basePath}/${ogImages.facebook}`;
		linkedIn = `${basePath}/${ogImages.linkedIn}`;
		defaultImage = `${basePath}/${ogImages.linkedIn}`;
	}

	return {
		twitter,
		facebook,
		linkedIn,
		defaultImage
	};
}

const create = (metaData) => {
	const results = [];
	const ogimages = createOgImagePaths({
		imageId: metaData.imageId,
		imageUrl: metaData.imageUrl,
		ogImages: metaData.ogImages
	});

	const noindex = metaData ? metaData.noindex : false;
	const nofollow = metaData ? metaData.nofollow : false;

	const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

	// defaults
	results.push({ name: 'robots', content: robotsContent });
	results.push({ name: 'googlebot', content: robotsContent });

	// twitter components
	if (metaData.title) {
		results.push({ name: 'title', content: metaData.title });
		results.push({ property: 'twitter:title', content: metaData.title });
		results.push({ property: 'og:title', content: metaData.title });
	}

	if (metaData.description) {
		results.push({ name: 'description', content: metaData.description });

		results.push({
			property: 'twitter:description',
			content: metaData.description
		});

		results.push({
			property: 'og:description',
			content: metaData.description
		});
	}

	// twitter
	results.push({
		property: 'twitter:creator',
		content: metaData.twitter?.creator || '@thatconference'
	});

	results.push({ property: 'twitter:image', content: ogimages.twitter });
	results.push({ property: 'twitter:card', content: ogimages.twitter });
	results.push({
		property: 'twitter:image:alt',
		content: ogimages.twitter
	});

	results.push({ property: 'twitter:site', content: metaData.twitter?.site || 'https://that.us/' });

	// open graph components
	results.push({ property: 'og:url', content: metaData.openGraph?.url || 'https://that.us/' });
	results.push({ property: 'og:site_property', content: 'THAT' });
	results.push({
		property: 'og:type',
		content: metaData.openGraph?.type?.toLowerCase() || 'website'
	});
	results.push({ property: 'og:locale', content: 'en_US' });
	results.push({ property: 'og:image', content: ogimages.facebook });

	return results;
};

export default create;
