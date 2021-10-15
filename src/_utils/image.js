const attributes = ['auto=format', 'mask=ellipse', 'fit=crop', 'q=60'];
const res = ['dpr=1 1x', 'dpr=2 2x', 'dpr=3 3x'];

function buildSrcSet(baseUrl, imgSizes) {
	const r = attributes.join('&');

	const srcset = [];
	const src = `${baseUrl}/${r}&h=${imgSizes[0]}&w=${imgSizes[0]}`;

	imgSizes.forEach((size) => {
		const base = `${baseUrl}?${r}&h=${size}&w=${size}`;

		res.forEach((r) => {
			srcset.push(`${base}&${r}`);
		});
	});

	return {
		src,
		srcset: srcset.toString()
	};
}

export default buildSrcSet;
