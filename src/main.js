/* eslint-disable no-undef */
import { inspect } from '@xstate/inspect';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

import config, { debug } from './config';
import App from './App.svelte';

if (debug.xstate) {
  inspect({
    url: 'https://statecharts.io/inspect',
    iframe: false,
  });
}

Sentry.init({
  dsn:
    'https://15d4b436dc0a4366a0ac388c65772926@o235190.ingest.sentry.io/5357492',
  integrations: [new Integrations.BrowserTracing()],
  attachStacktrace: true,
  release: config.version,
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
