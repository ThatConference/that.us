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

if (config.nodeEnv !== 'development') {
  // only initialize LogRocket in non-dev environments
  // https://docs.logrocket.com/docs/development#using-logrocket-in-development
  LogRocket.init(logging.logRocket);
}

Sentry.init({
  dsn: logging.dsn,
  release: config.version,
  environment: logging.environment,
  debug: logging.environment === 'development',
  attachStacktrace: true,
  integrations: [new Integrations.BrowserTracing()],
  beforeSend(event) {
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

const app = new App({
  target: document.body,
  props: {},
});

export default app;
