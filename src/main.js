/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

import { inspect } from '@xstate/inspect';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import LogRocket from 'logrocket';

import config, { debug, logging } from './config';
import App from './App.svelte';

if (debug.xstate) {
  inspect({
    url: 'https://statecharts.io/inspect',
    iframe: false,
  });
}

Sentry.init({
  dsn: logging.dsn,
  release: config.version,
  environment: logging.environment,
  debug: false,
  attachStacktrace: true,
  integrations: [new Integrations.BrowserTracing()],
  beforeSend(event) {
    const logRocketSession = LogRocket.sessionURL;
    if (logRocketSession !== null) {
      event.extra.LogRocket = logRocketSession;
    }

    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        onLoad: () => {
          if (document) {
            const sentryEmbed = document.querySelector(
              '.sentry-error-embed .close',
            );
            if (sentryEmbed) {
              sentryEmbed.addEventListener('click', () => {
                window.location.href = '/';
              });
            } else {
              console.error('could not load sentry feedback form');
            }
          }
        },
      });
    }

    return event;
  },
});

if (config.nodeEnv !== 'development') {
  // only initialize LogRocket in non-dev environments
  // https://docs.logrocket.com/docs/development#using-logrocket-in-development
  LogRocket.init(logging.logRocket);

  LogRocket.getSessionURL(sessionURL => {
    Sentry.configureScope(scope => {
      scope.setExtra('LogRocketSession', sessionURL);
    });
  });
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
