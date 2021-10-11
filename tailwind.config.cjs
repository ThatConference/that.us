/* eslint-disable global-require */
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			og: ['Roboto']
		},

		// interFontFeatures: {
		// 	default: ['calt', 'liga', 'kern'],
		// 	numeric: ['tnum', 'salt', 'ss02']
		// },

		extend: {
			colors: {
				'that-offWhite': '#F7F7F7',
				'that-grey': '#555555',
				'that-gray': '#555555',
				'that-orange': '#FF834D',
				'that-red': '#F74646',
				'that-blue': '#26529A',
				'that-navy': '#1F2A63', // active, text, section bg
				'that-navyDark': '#16215A',

				thatOrange: {
					100: '#ffede5',
					200: '#ffcab3',
					300: '#ffa680',
					400: '#ff834d', // base color
					500: '#ff5f1a',
					600: '#e64600',
					700: '#b33600',
					800: '#802700',
					900: '#4d1700'
				},

				// todo: not sure we have the right reds here... logo, tx seem to be missing
				thatRed: {
					100: '#fddada',
					200: '#fcb5b5',
					300: '#fa9090',
					400: '#f96b6b',
					500: '#f74646', // base colors
					600: '#c63838',
					700: '#942a2a',
					800: '#631c1c',
					900: '#310e0e'
				},

				// todo: do we have our logo blue in here?
				thatBlue: {
					100: '#d4dceb',
					200: '#a8bad7',
					300: '#7d97c2',
					400: '#5175ae',
					500: '#26529a', // base color
					600: '#1e427b',
					700: '#1F2A63', // base active, text, section bg
					800: '#16215A', // base dark navy
					900: '#0f213e'
				}
			}
		}
	},

	// Necessary z-index for the date headers in Activities
	zIndex: {
		1: '1'
	},

	variants: {
		extend: {
			fontWeight: ['hover', 'focus']
		}
	},

	plugins: [
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio')
	]
};
