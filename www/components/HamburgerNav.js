import styled from 'styled-components';
import {above, below} from '../utitlies/breakpoint.js';

const Hamburger = styled.button`
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  &:hover {
    opacity: 0.7;
  }

  ${above.med`
    display: none;
  `};
`;

const HamburgerBox = styled.span`
  width: 40px;
  height: 24px;
  display: inline-block;
  position: relative;
`;

const HamburgerInner = styled.span`
  display: block;
  top: 50%;
  margin-top: -2px;
  width: 40px;
  height: 4px;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.075s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  background-color: ${({ theme }) => theme.colors.orange};

  ${({ menuOpen }) => menuOpen && `
    transform: rotate(45deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  `}

  &::before, &::after {
    width: 40px;
    height: 4px;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
    background-color: ${({ theme }) => theme.colors.orange};
  }
  &::before, &::after {
    content: "";
    display: block;
  }

  &::before {
    top: -10px;
    transition: top 0.075s 0.12s ease, opacity 0.075s ease;
    ${({ menuOpen }) => menuOpen && `
      top: 0;
      opacity: 0;
      transition: top 0.075s ease, opacity 0.075s 0.12s ease;
    `}
  }

  &::after {
    bottom: -10px;
    transition: bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    ${({ menuOpen }) => menuOpen && `
      bottom: 0;
      transform: rotate(-90deg);
      transition: bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    `}
  }
`;

const HamburgerNav = props => {
  return(
    <Hamburger
      onClick={() => props.onClick() }
      menuOpen={ props.menuOpen }
    >
      <HamburgerBox>
        <HamburgerInner menuOpen={ props.menuOpen } />
      </HamburgerBox>
    </Hamburger>
  )
};

export default HamburgerNav;
