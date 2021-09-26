import * as Sentry from '@sentry/browser';
import isoFetch from 'isomorphic-fetch';

import loading from '$stores/loading';
import config from '$utils/config';

function init(fetch, url) {
	let _url = url || config.api;
	let _fetch = fetch || isoFetch;

	let headers = {
		credentials: 'include',
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
			})
			.catch((error) => {
				Sentry.captureException(error);
			});
	}

	function secureQuery({ query, variables = {} }) {
		loading.set(true);

		return _fetch(`${config.hostURL}/api/auth/proxy/`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				credentials: 'include',
				'Content-Type': 'application/json'
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
			})
			.catch((error) => {
				Sentry.captureException(error);
			});
	}

	function mutation({ mutation, variables = {} }) {
		loading.set(true);
		return _fetch(`${config.hostURL}/api/auth/proxy/`, {
			method: 'POST',
			headers: {
				credentials: 'include',
				'Content-Type': 'application/json'
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
			})
			.catch((error) => {
				Sentry.captureException(error);
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
