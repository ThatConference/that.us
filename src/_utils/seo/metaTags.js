const create = (metaData) => {
	const results = [];

	const noindex = metaData ? metaData.noindex : false;
	const nofollow = metaData ? metaData.nofollow : false;

	const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

	// defaults
	results.push({ name: 'robots', content: robotsContent });
	results.push({ name: 'googlebot', content: robotsContent });

	// twitter components
	if (metaData.title) {
		results.push({ name: 'twitter:title', content: metaData.title });
		results.push({ name: 'og:title', content: metaData.title });
	}

	if (metaData.description) {
		results.push({ name: 'description', content: metaData.description });

		results.push({
			name: 'twitter:description',
			content: metaData.description
		});

		results.push({
			name: 'og:description',
			content: metaData.description
		});
	}

	// twitter
	results.push({
		name: 'twitter:creator',
		content: metaData.twitter?.creator || '@thatconference'
	});

	results.push({ name: 'twitter:image', content: metaData.image || 'https://that.us/favicon.png' });
	results.push({
		name: 'twitter:image:alt',
		content: metaData.image || 'https://that.us/favicon.png'
	});

	results.push({ name: 'twitter:site', content: metaData.twitter?.site || 'https://that.us/' });

	// open graph components
	results.push({ name: 'og:url', content: metaData.openGraph?.url || 'https://that.us/' });
	results.push({ name: 'og:site_name', content: 'THAT' });
	results.push({ name: 'og:type', content: metaData.openGraph?.type?.toLowerCase() || 'website' });
	results.push({ name: 'og:locale', content: 'en_US' });
	results.push({ name: 'og:image', content: 'https://that.us/favicon.png' });

	return results;
};

export default create;
