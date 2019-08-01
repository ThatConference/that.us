import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';

import Page from '../components/Page';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}
