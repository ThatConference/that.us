import { browser } from '$app/env';
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

	const json = (r) => {
		console.log('response', r);
		return r.json();
	};

	function updateHeaders(values) {
		headers = {
			...headers,
			values
		};
	}

	function query({ query, variables = {} }) {
		if (browser) loading.set(true);
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
				if (browser) loading.set(false);
				return r;
			})
			.catch((error) => {
				Sentry.captureException(error);
			});
	}

	function secureQuery({ query, variables = {} }) {
		if (browser) loading.set(true);
		return _fetch(`${config.hostURL}/api/auth/proxy/`, {
			method: 'POST',
			headers: {
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
				if (browser) loading.set(false);
				console.log('reuslts in gfetch', r);
				return r;
			})
			.catch((error) => {
				console.log('gfetch error', error);
				Sentry.captureException(error);
			});
	}

	function mutation({ mutation, variables = {} }) {
		if (browser) loading.set(true);
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
				if (browser) loading.set(false);
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
