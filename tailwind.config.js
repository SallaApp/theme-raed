module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme   : {
        container : {
            center : true,
            padding: '10px',
            screens: {
                '2xl': "1280px"
            }
        },
        extend    : {
            colors             : {
                'dark'            : '#1D1F1F',
                'primary-dark'    : 'var(--color-primary-dark)'
            },
            borderRadius       : {
                DEFAULT: '.75rem',
            },
            boxShadow          : {
                'md'      : '5px 10px 99px #2B2D340D',
            },
        },
    },
    corePlugins: {
      outline: false,
    },
    plugins: [
      // JIT-only: emits the s-* rules this theme's own markup uses (no safe-list).
      require('@salla.sa/twilight-tailwind-theme'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
}
