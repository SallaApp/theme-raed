module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme   : {
        fontFamily: {
            sans: [
                'var(--font-main)',
                '-apple-system',
                'BlinkMacSystemFont',
            ],
            primary: 'var(--font-main)'
        },
        container : {
            center : true,
            padding: '10px',
            screens: {
                '2xl': "1280px"
            }
        },
        extend    : {
            transitionTimingFunction: {
                'elastic': 'cubic-bezier(0.55, 0, 0.1, 1)',
            },
            colors             : {
                'dark'            : '#1D1F1F',
                'primary'         : 'var(--color-primary)',
                'primary-d'       : 'var(--color-primary-dark)',
                'primary-l'       : 'var(--color-primary-light)',
                'primary-reverse' : 'var(--color-primary-reverse)',
                'primary-dark'    : 'var(--color-primary-dark)'
            },
            borderRadius       : {
                DEFAULT: '.75rem',
            },
            boxShadow          : {
                'default' : '5px 10px 30px #2B2D340D',
                'md'      : '5px 10px 99px #2B2D340D',
            },
            zIndex             : {
                '1': '1',
            },
            screens            : {
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
            },
            animation: {
                slideUpFromBottom: 'slideUpFromBottom .6s linear',
                slideDownFromBottom: 'slideDownFromBottom .6s linear',
            },
        },
    },
    corePlugins: {
      outline: false,
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
}
