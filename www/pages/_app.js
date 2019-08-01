import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';

import Head from 'next/head';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}
