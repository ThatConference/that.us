import React, { Component, Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/globalStyle';
import baseTheme from '../styles/baseTheme';

import Meta from './Meta';
import Header from './Header';
import Footer from './Footer';

const StyledPage = styled.div`
  background: ${props => props.theme.colors.backgroundColor};
  color: ${props => props.theme.colors.black};
`;

const CorePage = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;
`;

const InnerPage = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={baseTheme}>
        <Fragment>
          <StyledPage>
            <GlobalStyle />
            <Meta />
            <CorePage>
              <Header />
              <InnerPage>{this.props.children}</InnerPage>
              <Footer modifiers="site" />
            </CorePage>
          </StyledPage>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default Page;
