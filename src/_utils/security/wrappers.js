function ensureLeadingSlash(path) {
	return path.startsWith('/') ? path : `/${path}`;
}

function buildUrl(host, path, query) {
	const slashPath = ensureLeadingSlash(path || '/');
	const urlObj = new URL(`https://${host}${slashPath}`);

	if (typeof query === 'string') {
		urlObj.search = query;
	} else if (query && typeof query.toString === 'function') {
		urlObj.search = query.toString();
	}

	return urlObj.toString();
}

// TODO: Implement caching with WeakMap so that auth0's session cache can be used to best effect, as otherwise we'll be calling this too often
// Cache should, given the same Svelte request object, always return the same NextApiRequest mimic
function mkReq(param) {
	const result = {
		method: 'GET',
		headers: param.headers,
		query: Object.fromEntries(param.query), // TODO: Check whether just plain `param.query` will work here
		url: buildUrl(param.host || 'localhost', param.path || '/', param.query)
		// TODO: Build "cookies" object since Auth0 will want it
	};

	if (param.body && typeof param.body.getAll === 'function') {
		// Body is a ReadOnlyFormData object from Svelte, but auth0-nextjs will expect a plain object
		result.body = Object.fromEntries(param.body);
	} else if (typeof param.body === 'string') {
		result.body = param.body;
	} else {
		result.body = param.body || {};
	}

	return result;
}

// TODO: Implement caching with WeakMap based on original Svelte request object (which we'll preserve a reference to in the ResMimic instance so that they're deferenced together)
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
		return { status, headers, body };
	}
}

function auth0Wrapper(auth0fn) {
	return (param, auth0FnOptions) => {
		const req = mkReq(param);
		const res = new ResMimic();

		return auth0fn(req, res, auth0FnOptions)
			.then(() => res.getSvelteResponse())
			.catch((error) => {
				console.error('auth error', error);
				return { status: 500, body: error };
			});
	};
}

function auth0WrapperJson(auth0fn) {
	return (svelteReq, auth0FnOptions) => {
		const req = mkReq(svelteReq);
		const res = new ResMimic();
		return auth0fn(req, res, auth0FnOptions);
	};
}

export { mkReq, ResMimic, auth0Wrapper, auth0WrapperJson };
