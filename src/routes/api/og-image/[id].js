import config from '$utils/config';

const baseHostImage = 'https://that.imgix.net/og-image';

export async function GET({ params }) {
	let { id } = params;
	const response = await fetch(`${baseHostImage}/${id}.png`);

	let body;

	if (response.status === 200) {
		const r = await response.arrayBuffer();
		body = Buffer.from(r);
	} else {
		const r = await fetch(`${config.hostURL}/images/ActivityDefault.jpg`);
		const imageBuffer = await r.arrayBuffer();
		body = Buffer.from(imageBuffer);
	}

	return {
		headers: {
			'Content-Type': 'image/png'
		},
		body
	};
}
