import * as Sentry from '@sentry/browser';

export const log = ({ error, extra = {}, tags }) => {
  Sentry.withScope(scope => {
    scope.setLevel('error');

    Object.keys(extra).forEach(e => {
      scope.setExtra(e, extra[e]);
    });

    Sentry.captureException(new Error(error), {
      tags: {
        ...tags,
      },
    });
  });
};

export default log;
