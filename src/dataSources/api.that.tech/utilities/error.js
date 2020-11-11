import * as Sentry from '@sentry/browser';

export const log = (error, tag) => {
  Sentry.withScope(scope => {
    scope.setLevel('error');

    Sentry.setExtra('graph combinedError', error);

    Sentry.captureException(new Error(error), {
      tags: {
        api_that_tech: tag,
      },
    });
  });
};

export default log;
