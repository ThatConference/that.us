// export const trailingSlash = 'always';

import '../app.css';
import 'lazysizes';
import { browser, dev } from '$app/environment';

import { v4 as uuidv4 } from 'uuid';
import { inspect } from '@xstate/inspect';
import * as Sentry from '@sentry/svelte';
import { inject } from '@vercel/analytics';

import { debug } from '$utils/config.public';
import coreQueryApi from '$dataSources/api.that.tech/core/queries';

const correlationId = uuidv4();

inject({ mode: dev ? 'development' : 'production' });

if (!dev) {
	Sentry.configureScope((scope) => {
		scope.setTag('correlationId', correlationId);
	});
}

if (debug.xstate && browser) {
	inspect({
		url: 'https://statecharts.io/inspect',
		iframe: false
	});
}

export async function load({ data, fetch }) {
	const { queryDropDownValues } = coreQueryApi(fetch);
	const dropDownKeyValuePairs = await queryDropDownValues();

	return {
		correlationId,
		dropDownKeyValuePairs,
		...data
	};
}
