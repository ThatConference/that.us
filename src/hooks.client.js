import * as Sentry from '@sentry/sveltekit';
import { logging } from '$utils/config.public';

// If you don't want to use Session Replay, remove the `Replay` integration,
// `replaysSessionSampleRate` and `replaysOnErrorSampleRate` options.
Sentry.init({
	dsn: logging.dsn,
	attachStacktrace: true,
	environment: logging.environment,
	denyUrls: logging.denyUrls,
	enableTracing: false,
	tracesSampleRate: 0
});

export const handleError = Sentry.handleErrorWithSentry();
