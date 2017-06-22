const isProd = process.env.NODE_ENV === 'production'
const resolve = require.resolve

export default () => ({
  plugins: [
    isProd ? resolve('babel-plugin-transform-react-constant-elements') : null,
    isProd ? resolve('babel-plugin-transform-react-inline-elements') : null,
    isProd ? resolve('babel-plugin-transform-react-remove-prop-types') : null,
  ].filter(Boolean),
})
