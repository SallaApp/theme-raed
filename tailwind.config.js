//todo:: use import {tailwind} from "@salla.sa/twilight-components"
const colors = require('tailwindcss/colors');
delete colors['lightBlue']

module.exports = {
    mode: 'jit',
    purge: {
        enabled: true,
        content: [
            "views/**/*.twig",
            "assets/js/**/*.js",
            'node_modules/@salla.sa/twilight-components/src/components/**/*.tsx',
            //todo:: inject it via the plugin or easier way
            'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
            'node_modules/@salla.sa/twilight-components/src/components/**/*.tsx',
        ],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme   : {
        container : {
            center : true,
            padding: '20px',
            screens: {
                '2xl': "1280px"
            }
        },
        fontFamily: {
            sans: [
                'var(--font-main)',
                '-apple-system',
                'BlinkMacSystemFont',
            ],
            primary: "var(--font-main)"
        },
        colors    : colors,
        extend    : {
            transitionTimingFunction: {
              'elastic': 'cubic-bezier(0.55, 0, 0.1, 1)',
            },
            gridTemplateColumns: {
                'auto-fill'  : 'repeat(auto-fill, 290px)',
                'auto-fill-6': 'repeat(auto-fill, 180px)',
            },
            colors             : {
                'inherit'      : 'inherit',
                'primary'      : 'var(--color-main)',
                'primary-d'    : 'var(--color-main-d)',
                'primary-l'    : 'var(--color-main-l)',
                'dark-gray'    : '#A6B3BA',
                'primary-reverse': 'var(--color-main-reverse)',
                'transparent'  : 'transparent',
                'theme-yellow' : "#FF9E01",
                'theme-blue'   : "#27BEE1",
                'theme-red'    : "#FF6767",
                'light-gray'   : '#F9FAFB',
                'border-color' : '#EEEEEE',
                'border-dark'  : '#3A3C43',
                'gray-bg2'     : 'var(--bg-gray)',// 'light-gray': '#F9FAFB',
                'gray-150'     : '#eff0f0',
                'color-gray'   : 'var(--color-grey)',
                'gray-bg'      : '#F5F5F5',
                'darkGray-bg'  : '#F3F3F3',
                'title-color'  : 'var(--color-title)',
                'darker'       : '#333',
                'reverse'      : 'var(--color-text-reverse)',
                'reverse-dark' : '#C6C7CE',
            },
            spacing: {
              '3.75' : '15px',
              '7.5' : '30px',
              '58' : '232px',
              '100' : '28rem',
              '116' : '464px',
              '132' : '528px',
              '200' : '800px',
            },
            borderRadius       : {
                'large': '22px',
                'big'  : '40px',
                'tiny' : '3px',
            },
            fontSize           : {
                'icon-lg'   : '33px',
                'xxs'       : '10px',
                'xxxs'      : '8px',
                'title-size': '42px',
                '22px'      : '22px',
            },
            lineHeight         : {
                '12': '3rem',
                '14': '3.5rem',
                '16': '4rem',
                '18': '4.5rem',
                '20': '5rem',
            },
            boxShadow          : {
                'default' : '5px 10px 30px #2B2D340D;',
                'top'     : '0px 0px 10px #0000001A;',
                'md'      : '5px 10px 99px #2B2D340D',
                'dropdown'      : '0 4px 8px rgba(161, 121, 121, 0.07)',
                'light'   : '0px 4px 15px rgba(1, 1, 1, 0.06)',
                'huge'    : '0px 3px 6px #00000029',
                'progress': '0 5px 15px rgba(92, 213, 196, 0.4)',
                // 'mobile': '-10px 14px 14px rgb(0 0 0 / 15%), -20px 14px 64px rgb(0 0 0 / 25%)',
                'mobile': 'rgb(0 0 0 / 9%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px, rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 18px, rgb(0 0 0 / 9%) -15px 10px 7px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -25px 20px 20px',
            },
            width              : {
                '18': '4.5rem',
                '22': '5.5rem',
                '74': '18.5rem',
                '76': '19rem',
                '78': '19.5rem',
            },
            height             : {
                'banner'        : '200px',
                'lg-banner'     : '428px',
                'full-banner'   : '600px',
                '500'           : '500px',
                '460'           : '460px',
            },
            minWidth           : {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            maxWidth           : {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            zIndex             : {
                '1': '1',
                '2': '2',
                '-1': '-1',
            },
            screens            : {
                'xxs': {'min': '380px', 'max': '479px'},
                // 'xs': { 'min': '480px', 'max': '639px' },
                'xs': '480px',
            },
            backgroundOpacity  : {
                '05': '0.05',
            },
            transitionProperty : {
                'height': 'height'
            }
        },
    },
    variants: {
        extend: {
          translate: ['group-hover'],
        },
    },

    corePlugins: {
      outline: false,
    },

    plugins: [
      require('tailwindcss-rtl'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/jit'),
      require('@salla.sa/twilight-tailwind-theme'),
    ],
}