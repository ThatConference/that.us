import * as Sentry from '@sentry/browser';

export const log = (error, tag) => {
  Sentry.withScope(scope => {
    scope.setLevel('error');

    Sentry.setExtra('graph combinedError', error);
    Sentry.setExtra('graph combinedError raw', JSON.stringify(error));

    Sentry.captureException(new Error(error), {
      tags: {
        api_that_tech: tag,
      },
    });
  });
};

export const logMessage = (error, tag) => {
  Sentry.withScope(scope => {
    scope.setLevel('info');

    Sentry.setExtra('graph combinedError', error);
    Sentry.setExtra('graph combinedError raw', JSON.stringify(error));

    Sentry.captureException(new Error(error), {
      tags: {
        api_that_tech: tag,
      },
    });
  });
};

export default log;
