/** @type {import("tailwindcss").Config} */

module.exports = {
  important: true,
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter var'", 'caviar-dreams'],
        subheading: ['caviar-dreams-bold'],
        heading: ['campton-thin'],
        body: ['campton-light'],
      },
      fontSize: {
        xxs: '0.675rem',
      },
      colors: {
        brand: {
          50: '#F7F2EE',
          100: '#EEE5DD',
          200: '#DECCBA',
          300: '#CDB398',
          400: '#BD9975',
          DEFAULT: '#AC8053',
          600: '#8A6642',
          700: '#674D32',
          800: '#453321',
          900: '#221A11',
        },
        secondary: {
          50: '#EEF2F7',
          100: '#DDE5EE',
          200: '#BACCDE',
          300: '#98B3CD',
          400: '#7599BD',
          DEFAULT: '#537FAC',
          600: '#42668A',
          700: '#324D67',
          800: '#213345',
          900: '#111A22',
        },
        grey: {
          100: '#999999',
          200: '#888888',
          300: '#777777',
          400: '#666666',
          DEFAULT: '#555555',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
        body: {
          light: '#fff',
          50: '#EBEBEB',
          100: '#D6D6D6',
          200: '#ADADAD',
          300: '#858585',
          400: '#5C5C5C',
          DEFAULT: '#333333',
          600: '#292929',
          700: '#1F1F1F',
          800: '#141414',
          900: '#0A0A0A',
        },
        heading: {
          light: '#fff',
          DEFAULT: '#2B2B2B',
        },
        icon: {
          DEFAULT: '#C0C0C0',
        },
        background: {
          light: '#fff',
          DEFAULT: '#EBEBEB',
          dark: '#262626',
        },
        primary: {
          DEFAULT: '#A57C52',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },

  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}
