import { browser } from '$app/environment';
import * as Sentry from '@sentry/svelte';
import isoFetch from 'isomorphic-fetch';
import fetchRetry from 'fetch-retry';

import loading from '$stores/loading';
import config from '$utils/config.public';

function init(fetch) {
	let _cacheApiUrl = config.api.cache;
	let _fetch = fetchRetry(fetch || isoFetch);

	let headers = {
		credentials: 'include',
		'Content-Type': 'application/json',
		'that-site': 'that.us'
		// 'that-correlation-id': createCorrelationId()
	};

	const handleResult = (r) => {
		if (browser) {
			loading.set(false);
		}

		if (r.status === 200) {
			return r.json();
		} else {
			throw new Error(`${r.status} ${r.statusText}`);
		}
	};

	function updateHeaders(values) {
		headers = {
			...headers,
			values
		};
	}

	function retryOn(attempt, error, response) {
		if (error !== null || response?.status === 503) {
			Sentry.setContext('fetch retryOn', {
				message: `Fetch network error, retrying, attempt number ${attempt + 1}, response.status ${
					response?.status
				}, is response empty? ${response === undefined || response === null}`
			});
			Sentry.captureMessage(error);

			return true;
		}
	}

	function query({ query, variables = {} }) {
		if (browser) loading.set(true);

		const fr = fetchRetry(isoFetch);
		return fr(_cacheApiUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
            ${query}
          `,
				variables
			}),
			retries: 3,
			retryOn
		})
			.then(handleResult)
			.catch((error) => {
				console.error('api query error:', error);
				Sentry.captureException(error);
			});
	}

	function secureQuery({ query, variables = {} }) {
		const dynamicEndpoint = `${config.hostURL}/api/auth/proxy/`;

		if (browser) {
			loading.set(true);
		}

		return _fetch(dynamicEndpoint, {
			method: 'POST',
			headers: {
				credentials: 'include',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
					${query}
          `,
				variables
			}),
			retryOn
		})
			.then(handleResult)
			.catch((error) => {
				console.error('api secure query error:', error);
				Sentry.captureException(error);
			});
	}

	function mutation({ mutation, variables = {} }) {
		let dynamicEndpoint = `${config.hostURL}/api/auth/proxy/`;

		if (browser) {
			loading.set(true);
		}

		return _fetch(dynamicEndpoint, {
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
			}),
			retryOn
		})
			.then(handleResult)
			.catch((error) => {
				console.error('api mutation error:', error);
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
