import config from '$utils/config';

const create = (metaData) => {
	const results = [];

	const formattedImage = metaData.imageId
		? `${config.hostURL}/api/og-image/${metaData.imageId}`
		: metaData.openGraph?.imageId
		? metaData.openGraph?.imageId
		: 'https://that.us/favicon.png';

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

	results.push({ property: 'twitter:image', content: formattedImage });
	results.push({ property: 'twitter:card', content: formattedImage });
	results.push({
		property: 'twitter:image:alt',
		content: formattedImage
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
	results.push({ property: 'og:image', content: formattedImage });

	return results;
};

export default create;
