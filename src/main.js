/* eslint-disable no-undef */
import { inspect } from '@xstate/inspect';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

import { debug } from './config';
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
  beforeSend(event) {
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        onLoad: () => {
          if (document) {
            document
              .querySelector('.sentry-error-embed .close')
              .addEventListener('click', () => {
                window.location.href = '/';
              });
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
