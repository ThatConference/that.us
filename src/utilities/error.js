import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';

export const log = ({ error, extra = {}, tags }) => {
  const err = new Error(error);

  LogRocket.captureException(err, {
    tags,
    extra,
  });

  Sentry.withScope(scope => {
    scope.setLevel('error');
    Object.keys(extra).forEach(e => {
      scope.setExtra(e, extra[e]);
    });

    Sentry.captureException(err, {
      tags: {
        ...tags,
      },
    });
  });
};

export default log;
