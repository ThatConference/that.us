import * as Sentry from '@sentry/sveltekit';
import { logging } from '$utils/config.public';

// If you don't want to use Session Replay, remove the `Replay` integration,
// `replaysSessionSampleRate` and `replaysOnErrorSampleRate` options.
Sentry.init({
	dsn: logging.dsn,
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()],
	environment: logging.environment
});

export const handleError = Sentry.handleErrorWithSentry();
