import config from '$utils/config';

function createOgImagePaths(imageId = undefined, imageUrl = undefined) {
	let twitter = '/images/og-images/twitter.jpg';
	let facebook = '/images/og-images/facebook.jpg';
	let linkedIn = '/images/og-images/linkedIn.jpg';
	let defaultImage = '/images/og-images/linkedIn.jpg';

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

	return {
		twitter,
		facebook,
		linkedIn,
		defaultImage
	};
}

const create = (metaData) => {
	const results = [];
	const ogimages = createOgImagePaths(metaData.imageId, metaData.imageUrl);

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
