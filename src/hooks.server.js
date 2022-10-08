import * as Sentry from '@sentry/svelte';

export async function handleError({ error, event }) {
	Sentry.captureException(error, { event });

	return {
		message: 'Whoops!',
		code: error.code ?? 'UNKNOWN'
	};
}
