import * as Sentry from '@sentry/browser';

export const log = ({ error, extra, tags }) => {
  Sentry.withScope(scope => {
    scope.setLevel('error');

    scope.setContext('meta', {
      ...extra,
    });

    Sentry.captureException(new Error(error), {
      tags: {
        ...tags,
      },
    });
  });
};

export default log;
