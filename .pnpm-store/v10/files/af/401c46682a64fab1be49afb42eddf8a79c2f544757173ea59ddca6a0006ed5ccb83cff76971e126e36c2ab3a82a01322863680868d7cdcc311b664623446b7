const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities, addVariant, matchUtilities, theme }) {
  addVariant('border', ['&:focus'])

  addUtilities({
    '.s-hidden': { '@apply hidden': {} },
    '.s-has-error': { '@apply border-red-400 focus:border-red-500': {} },
    '.rounded-icon': { '@apply w-16 h-16 flex justify-center items-center rounded-full text-3xl': {} },
    '.form-input': { '@apply w-full h-10 transition-colors duration-300 focus:ring-transparent focus:border-primary dark:focus:border-primary sm:text-sm border-gray-200 dark:bg-gray-600 dark:border-gray-600 rounded-md': {} },
    '.btn': { '@apply transition duration-300 flex-1 inline-flex justify-center items-center px-6 pb-2.5 pt-2 text-sm font-bold rounded-md hover:opacity-80 whitespace-nowrap': {} },
    '.btn-primary': { '@apply text-primary-reverse border border-primary bg-primary': {} },
    '.btn-danger': { '@apply bg-red-400 text-white hover:opacity-80': {} },
    '.btn-outline': { '@apply text-gray-400 bg-white shadow-sm hover:text-gray-600 border border-gray-200': {} },
    '.btn-outline-primary': { '@apply border border-primary text-primary hover:bg-primary hover:text-primary-reverse': {} },
    '.form-control': { '@apply bg-white border border-gray-300 text-gray-900 text-sm rounded block w-full p-2 focus:ring-0 focus:border-primary': {} },
    '.form-label': { '@apply block mb-1 text-sm font-medium text-gray-900': {} },
    '.form-group': { '@apply my-3': {} },
    '.font-default': { '@apply my-3': {} },
  });

  // todo :: move it to global
  addUtilities({
    '.spinner-loader': {
      'border-right-color': 'var(--color-main) !important',
      '&.reverse': {
        'border-right-color': '#9f7171 !important',
        'background-color': '#f98181'
      }
    },
    '.custom-checkbox': {
      'appearance': 'none',
      'background-color': '#fff',
      'margin': '0',
      'width': '18px',
      'height': '18px',
      'border-width': '1px',
      'border-radius': '4px',
      'display': 'grid',
      'place-content': 'center',
      '&:before': {
        'content': "",
        'width': '10px',
        'height': '10px',
        'clip-path': 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
        'transform': 'scale(0)',
        'transform-origin': 'bottom left',
        'transition': '120ms transform ease-in-out',
        'box-shadow': 'inset 1em 1em #444',
        'background-color': '#444',
      },
      '&:checked:before': {
        'transform': 'scale(1)'
      }
    },
    '.font-default': {
      'font-family': 'var(--font-main), -apple-system, BlinkMacSystemFont',
    },
    '.has-error': {
      '.s-form-label': {
        'color': '#ff443a',
      },
      '.s-form-control, .s-tel-input-control, .s-datetime-picker-input': {
        'border-color': '#ff443a',
        'color': '#ff443a',
      },
    },
    '.styled-scrollbar': {
      '&::-webkit-scrollbar': {
        'width': '5px'
      },
      '&::-webkit-scrollbar-track': {
        'background-color': '#eee'
      },
      '&::-webkit-scrollbar-thumb': {
        'background-color': 'var(--color-primary)',
        'border-radius': '10px',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        '-ms-border-radius': '10px',
        '-o-border-radius': '10px'
      }
    },
    '.toggle-checkbox': {
      'cursor': 'pointer',
      'display': 'inline-block',
      '.s-toggle-input': {
        'position': 'absolute',
        'visibility': 'hidden'
      },
      '.s-toggle-label': {
        'margin-left': '5px',
        'position': 'relative',
        'top': '2px'
      },
      '.s-toggle-switcher': {
        'display': 'inline-block',
        'background': '#ccc',
        'border-radius': '16px',
        'width': '40px',
        'height': '25px',
        'position': 'relative',
        'vertical-align': 'middle',
        'transition': 'background 0.25s',
        '&:before,&:after': {
          'content': '""',
        },
        '&:before': {
          'display': 'block',
          'background': '#fff',
          'border-radius': '50%',
          'box-shadow': '0 0 0 1px rgba(0,0,0,0.25)',
          'width': '20px',
          'height': '21px',
          'position': 'absolute',
          'top': '2.2px',
          'left': '1px',
          'transition': 'left 0.25s',
        },
      },
      '.s-toggle-input:checked + div': {
        'background': '#30D158',
        '&:before': {
          'left': '18px',
        }
      },
    }

  });

  addUtilities(require('./utilities.json'));
}, {
  important: true,
  darkMode: 'class', // or 'media' or 'class',
  theme: {
    fontFamily: { // move to plugin
      sans: [
        'var(--font-main)',
        '-apple-system',
        'BlinkMacSystemFont',
      ],
      primary: "var(--font-main)"
    },
    extend: {
      colors: {
        'inherit': 'inherit',
        'transparent': 'transparent',
        'primary': 'var(--color-primary)',
        'primary-d': 'var(--color-primary-dark)',
        'primary-l': 'var(--color-primary-light)',
        'primary-reverse': 'var(--color-primary-reverse)'
      },
      zIndex: {
        '1': '1',
      },
      fontSize: {
        'icon-lg': '33px',
      },
      boxShadow: {
        'default': '5px 10px 30px #2B2D340D;',
      },
      transitionTimingFunction: {
        'elastic': 'cubic-bezier(0.55, 0, 0.1, 1)',
      },
      screens: {
        'xxs': { 'min': '380px', 'max': '479px' },
        'xs': '480px',
      },
      keyframes: {
        slideUpFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
        slideDownFromBottom: {
          '0%': { transform: 'translateY(0%)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        slideUPFromTop: {
          '0%': { transform: 'translateY(-0%)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' }
        },
        slideDownFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(-0%)', opacity: '1' }
        },
      },
      animation: {
        slideUpFromBottom: 'slideUpFromBottom .6s linear',
        slideDownFromBottom: 'slideDownFromBottom .6s linear',
        slideDownFromTop: 'slideDownFromTop .6s linear',
        slideUPFromTop: 'slideUPFromTop .6s linear',
      },
    }
  }
});
