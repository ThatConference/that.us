import * as Sentry from '@sentry/svelte';

export const log = ({ errors, extra, tag }) => {
	errors.forEach((err) => {
		console.error(err);

		Sentry.setContext('api.that.tech error', {
			'graph combinedError': err,
			'graph combinedError raw': JSON.stringify(err),
			api_that_tech: tag,
			extra
		});

		Sentry.captureException(err);
	});
};

export const logMessage = (error, tag) => {
	Sentry.setContext('api.that.tech error', {
		'graph combinedError': error,
		'graph combinedError raw': JSON.stringify(error),
		api_that_tech: tag
	});
	Sentry.captureMessage('api.that.tech error');
};

export default log;
