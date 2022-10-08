import { error } from '@sveltejs/kit';
// TODO: Implement caching with WeakMap so that auth0's session cache can be used to best effect, as otherwise we'll be calling this too often
// Cache should, given the same Svelte request object, always return the same NextApiRequest mimic

function mkReq(request) {
	const result = {
		method: 'GET',
		headers: Object.fromEntries(request.headers),
		query: Object.fromEntries(new URL(request.url).searchParams),
		url: request.url
	};

	//todo.. this needs to get validated, since this is a get, body should always be {}
	if (request.body && typeof request.body.getAll === 'function') {
		// Body is a ReadOnlyFormData object from Svelte, but auth0-nextjs will expect a plain object
		result.body = Object.fromEntries(request.body);
	} else if (typeof request.body === 'string') {
		result.body = request.body;
	} else {
		result.body = request.body || {};
	}

	return result;
}
class ResMimic {
	constructor() {
		this.headers = new Map();
		this.statusCode = 200;
		this.statusMessage = undefined;
		this.bodyObj = undefined;
		this.bodyStr = '';
	}

	getHeader(key) {
		const value = this.headers.get(key);

		if (value && value.length === 1) {
			return value[0];
		} else {
			return value;
		}
	}

	setHeader(key, value) {
		const oldValue = this.headers.get(key.toLowerCase()) || [];
		const newValue = typeof value === 'string' ? [...oldValue, value] : [...oldValue, ...value];

		this.headers.set(key.toLowerCase(), newValue);

		return this;
	}

	writeHead(status, reason, headers) {
		this.statusCode = status;
		let realHeaders;

		if (typeof reason === 'string') {
			this.statusMessage = reason;
			realHeaders = headers;
		} else if (typeof reason === 'object' && !headers) {
			realHeaders = reason;
		} else {
			realHeaders = headers || {};
		}

		for (const key in realHeaders) {
			if (Object.prototype.hasOwnProperty.call(realHeaders, key)) {
				this.setHeader(key, realHeaders[key]);
			}
		}

		return this;
	}

	end() {
		return this;
	}

	send(body) {
		if (typeof body === 'object') {
			this.bodyObj = body;
		} else {
			this.bodyStr = body;
		}

		return this;
	}

	status(statusCode) {
		this.statusCode = statusCode;
		return this;
	}

	json(bodyObj) {
		this.bodyObj = bodyObj;
		this.setHeader('content-type', 'application/json');
		this.setHeader('credentials', 'include');

		return this;
	}

	getSvelteResponse() {
		const status = this.statusCode;
		const headers = {};

		for (const [k, v] of this.headers.entries()) {
			headers[k] = v.length === 1 ? v[0] : v;
		}

		const body = this.bodyObj ? this.bodyObj : this.bodyStr;

		return new Response(JSON.stringify(body), {
			status,
			headers
		});
	}
}

function auth0Wrapper(auth0fn) {
	return (request, auth0FnOptions) => {
		const req = mkReq(request);
		const res = new ResMimic();

		return auth0fn(req, res, auth0FnOptions)
			.then(() => res.getSvelteResponse())
			.catch((err) => {
				console.error('auth0 function wrapper error', err);
				throw error(500, err);
			});
	};
}

function auth0WrapperJson(auth0fn) {
	return (request, auth0FnOptions) => {
		const req = mkReq(request);
		const res = new ResMimic();

		return auth0fn(req, res, auth0FnOptions);
	};
}

export { auth0Wrapper, auth0WrapperJson };
