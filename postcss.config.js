// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': true },
    },
  }
}