import { css } from 'styled-components';

const size = {
  xsmall: 400,
  small: 720,
  med: 960,
  large: 1140
};

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const below = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
