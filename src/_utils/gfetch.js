import { get } from 'svelte/store';
import crossFetch from 'cross-fetch';

import loading from '$stores/loading';
import config from '$utils/config';
import { token } from '$utils/security';

function init(fetch, url) {
	let _url = url || config.api;
	let _fetch = fetch || crossFetch;

	let headers = {
		'Content-Type': 'application/json',
		'that-site': 'that.us'
		// 'that-correlation-id': createCorrelationId()
	};

	const json = (r) => r.json();

	function updateHeaders(values) {
		headers = {
			...headers,
			values
		};
	}

	function query({ query, variables = {} }) {
		loading.set(true);
		return _fetch(_url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
            ${query}
          `,
				variables
			})
		})
			.then(json)
			.then((r) => {
				loading.set(false);
				return r;
			});
	}

	function secureQuery({ query, variables = {} }) {
		// if (!t) throw new Error('no token found for user');

		loading.set(true);
		const t = get(token);

		return _fetch(_url, {
			method: 'POST',
			headers: {
				...headers,
				authorization: t ? `Bearer ${t}` : ''
			},
			body: JSON.stringify({
				query: `
            ${query}
          `,
				variables
			})
		})
			.then(json)
			.then((r) => {
				loading.set(false);
				return r;
			});
	}

	function mutation({ mutation, variables = {} }) {
		loading.set(true);
		const t = get(token);

		return _fetch(_url, {
			method: 'POST',
			headers: {
				...headers,
				authorization: t ? `Bearer ${t}` : ''
			},
			body: JSON.stringify({
				query: `
            ${mutation}
          `,
				variables
			})
		})
			.then(json)
			.then((r) => {
				loading.set(false);
				return r;
			});
	}

	return {
		updateHeaders,
		query,
		secureQuery,
		mutation
	};
}

export default init;