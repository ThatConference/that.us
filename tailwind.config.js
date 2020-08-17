/* eslint-disable global-require */
const { colors } = require('@tailwindcss/ui');

/* eslint-disable no-undef */
module.exports = {
  purge: [],
  theme: {
    interFontFeatures: {
      default: ['calt', 'liga', 'kern'],
      numeric: ['tnum', 'salt', 'ss02'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '6rem',
      '8xl': '8rem',
      '9xl': '9rem',
      '10xl': '10rem',
    },
    extend: {
      colors: {
        thatBlue: {
          '100': '#26529A',
          '200': '#26529A',
          '300': '#26529A',
          '400': '#26529A',
          '500': '#26529A',
          '600': '#26529A',
          '700': '#26529A',
          '800': '#1F2A63',
          '900': '#16215A',
        },
        thatOrange: {
          '100': '#ffede5',
          '200': '#ffcab3',
          '300': '#ffa680',
          '400': '#ff834d',
          '500': '#ff5f1a',
          '600': '#e64600',
          '700': '#b33600',
          '800': '#802700',
          '900': '#4d1700',
        },
        'that-orange': '#FF834D',
        'that-red': '#F74646',
        'that-blue': '#26529A',
        'that-navy': '#1F2A63',
        'that-navyDark': '#1F2A63',
      },
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-font-inter')({
      importFontFace: true,
      disableUnusedFeatures: true,
    }),
    require('@tailwindcss/ui'),
  ],
};
