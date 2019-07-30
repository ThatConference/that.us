import styled from 'styled-components';
import HamburgerNav from './HamburgerNav';
import NavItem from './NavItem';
import React, { useState } from 'react';
import {above, below} from '../utitlies/breakpoint.js';

const NavList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;

  ${below.med`
    flex-direction: column
    ${({ menuOpen }) => !menuOpen && `
      display: none;
    `}
    ${({ menuOpen }) => menuOpen && `
      display: inline-block;
    `}
  `}
`;

const NavListItem = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Nav = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={className}>
      <NavList menuOpen={ menuOpen }>
        <NavListItem>
          <NavItem
            title="about us"
            href="/about"
          />
        </NavListItem>
        <NavListItem>
          <NavItem
            title="contact us"
            href="/contact"
          />
        </NavListItem>
      </NavList>
      <HamburgerNav onClick={() => setMenuOpen(!menuOpen) } menuOpen={ menuOpen } />
    </nav>
  )
};

export default styled(Nav)`
  display: flex;
  width: 100%;
  flex-wrap: no-wrap;

  ${above.med`
    justify-content: center;
    align-items: center;
  `}

  ${below.med`
    justify-content: space-between;
  `}
)
`;
