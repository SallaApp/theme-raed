// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
        // Keep logical properties (margin-inline-start, text-align: end, …). Converting
        // them to left/right assumes LTR and flips every logical utility in Arabic.
        'logical-properties-and-values': false,
      },
    },
  }
}