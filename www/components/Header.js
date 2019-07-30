import router from 'next/router';
import nprogress from 'nprogress';
import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';

import Nav from './Nav';

router.onRouteChangeStart = () => {
  nprogress.start();
};

router.onRouteChangeComplete = () => {
  nprogress.done();
};

router.onRouteChangeError = () => {
  nprogress.done();
};

const Header = ({ className }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.pageYOffset);

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    }, {scrollingElement} = document;

    handleScroll();
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  });

  const scrolled = () => {
    return parseInt(scrollY) > 0 ? "scrolled" : "";
  };

  return (
    <header className={[className, scrolled()].join(" ")}>
    </header>
  );
}

export default styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12px;
  background-color: transparent;
  z-index: 1;
  position: fixed;
  width: 100%;
  transition: background-color 0.5s ease;

  &.scrolled {
    background-color: ${({ theme }) => theme.colors.light};

    a {
      color: ${({ theme }) => theme.colors.dark};

      &:hover {
        color: ${({ theme }) => theme.colors.orange};
      }
    }
  }
`;
