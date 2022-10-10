import * as Sentry from '@sentry/svelte';

export const log = ({ error, extra = {}, tags }) => {
	const err = new Error(error);

	Sentry.withScope((scope) => {
		scope.setLevel('error');
		Object.keys(extra).forEach((e) => {
			scope.setExtra(e, extra[e]);
		});

		Sentry.captureException(err, {
			tags: {
				...tags
			}
		});
	});
};

export default log;
