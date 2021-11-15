import * as Sentry from '@sentry/browser';

export const log = ({ errors, extra, tag }) => {
	errors.forEach((err) => {
		console.error(err);

		Sentry.withScope((scope) => {
			scope.setLevel('error');

			Sentry.setExtra(extra);
			Sentry.setExtra('graph combinedError', err);
			Sentry.setExtra('graph combinedError raw', JSON.stringify(err));

			Sentry.captureException(err, {
				tags: {
					api_that_tech: tag
				}
			});
		});
	});

	throw new Error(`api.that.tech errored`);
};

export const logMessage = (error, tag) => {
	Sentry.withScope((scope) => {
		scope.setLevel('info');

		Sentry.setExtra('graph combinedError', error);
		Sentry.setExtra('graph combinedError raw', JSON.stringify(error));

		Sentry.captureMessage('api.that.tech error', {
			tags: {
				api_that_tech: tag
			}
		});
	});
};

export default log;
