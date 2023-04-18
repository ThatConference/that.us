// export const trailingSlash = 'always';

import '../app.css';
import 'lazysizes';
import { browser, dev, version } from '$app/environment';

import { v4 as uuidv4 } from 'uuid';
import { inspect } from '@xstate/inspect';
import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/svelte';
import LogRocket from 'logrocket';

import { debug, logging } from '$utils/config.public';
import coreQueryApi from '$dataSources/api.that.tech/core/queries';

const correlationId = uuidv4();

if (!dev) {
	LogRocket.init(logging.logRocket);
	LogRocket.info('correlationId', correlationId);

	Sentry.init({
		dsn: logging.dsn,
		release: version ?? 'not-set',
		environment: logging.environment,
		debug: false,
		attachStacktrace: true,
		integrations: [new BrowserTracing()],
		normalizeDepth: 6
	});

	LogRocket.getSessionURL((sessionURL) => {
		Sentry.configureScope((scope) => {
			scope.setExtra('LogRocketSession', sessionURL);
		});
	});

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
