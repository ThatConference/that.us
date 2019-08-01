import Head from 'next/head';
import React, { Component, Fragment } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import Hero from '../components/Hero';
import SocialLinks from '../components/SocialLinks';

/*
gtag events for later reference

https://github.com/zeit/next.js/blob/master/examples/with-google-analytics/pages/contact.js
import * as gtag from '../lib/gtag'
gtag.event({
  action: 'submit_form',
  category: 'Contact',
  label: this.state.message
})
*/

class home extends Component {
  getImage() {
    const items = [
      'https://live.staticflickr.com/1831/43151326755_0c028664fb_h.jpg',
      'https://live.staticflickr.com/4429/36422307826_2699e07837_h.jpg',
      'https://live.staticflickr.com/1812/43359764724_38b9d3a22b_h.jpg',
      'https://live.staticflickr.com/4423/36299960852_0eee57ccab_h.jpg'
    ];
    return items[Math.floor(Math.random() * items.length)];
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://thatconference.activehosted.com/f/embed.php?id=10';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>THAT.us</title>
        </Head>
        <ParallaxProvider>
          <Fragment>
            <Hero
              imagePath={this.getImage()}
              fullHeight="true"
              heading="THAT.us"
              subheading="It's not a you, or I, or even them, it's all of US, together!"
            >
              <div className="_form_10" />
              <SocialLinks />
            </Hero>
          </Fragment>
        </ParallaxProvider>
      </Fragment>
    );
  }
}

export default home;
