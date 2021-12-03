import config from '$utils/config';

const baseHostImage = 'https://that.imgix.net/og-image';

export async function get({ params }) {
	let { id } = params;
	const response = await fetch(`${baseHostImage}/${id}.png`);

	let body;

	if (response.status === 200) {
		const buffer = await response.arrayBuffer();
		body = new Uint8Array(buffer);
	} else {
		const r = await fetch(`${config.hostURL}/images/ActivityDefault.jpg`);
		const imageBuffer = await r.arrayBuffer();
		body = new Uint8Array(imageBuffer);
	}

	return {
		headers: {
			'Content-Type': 'image/png'
		},
		body
	};
}
