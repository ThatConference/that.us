import config from '$utils/config';
import crossFetch from 'cross-fetch';

function init(fetch, url) {
	let _url = url || config.api;
	let _fetch = fetch || crossFetch;

	let headers = {
		'Content-Type': 'application/json',
		'that-site': 'that.us'
		// 'that-correlation-id': createCorrelationId()
		// authorization: $token ? `Bearer ${$token}` : '',
	};

	function updateHeaders(values) {
		headers = {
			...headers,
			values
		};
	}

	function query({ query, variables = {} }) {
		return _fetch(_url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
            ${query}
          `,
				variables
			})
		}).then((res) => res.json());

		//todo.. we should put a catch in here and redirect to the right places.. or at least log better.
	}

	function mutate({ mutation, variables = {} }) {
		return _fetch(_url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				mutation: `
            ${mutation}
          `,
				variables
			})
		}).then((res) => res.json());

		//todo.. we should put a catch in here and redirect to the right places.. or at least log better.
	}

	return {
		updateHeaders,
		query,
		mutate
	};
}

export default init;
