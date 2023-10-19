// JWT parsing

// Decodes jwt payload, doesn't validate signature
export const parseOnly = (jwt) => {
	let base64Payload;
	if (jwt?.split) {
		[, base64Payload] = jwt?.split('.') ?? [];
	}
	let jsonPayload = null;
	if (base64Payload) {
		jsonPayload = Buffer.from(base64Payload, 'base64').toString('utf8');
	}
	let payload = null;
	if (typeof jsonPayload === 'string') {
		payload = JSON.parse(jsonPayload);
	}

	if (payload?.sub) {
		return payload;
	}

	return null;
};
