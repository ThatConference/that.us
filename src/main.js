/* eslint-disable no-undef */
import { inspect } from '@xstate/inspect';
import { debug } from './config';
import App from './App.svelte';

if (debug.xstate) {
  inspect({
    url: 'https://statecharts.io/inspect',
    iframe: false,
  });
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
