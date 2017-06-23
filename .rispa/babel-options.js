const isProd = process.env.NODE_ENV === 'production'
const resolve = require.resolve

const productionPlugins = [
  resolve('babel-plugin-transform-react-constant-elements'),
  resolve('babel-plugin-transform-react-inline-elements'),
  resolve('babel-plugin-transform-react-remove-prop-types'),
]

const developmentPlugins = [
  resolve('react-hot-loader/babel'),
]

export default () => ({
  plugins: [
    ...(isProd ? productionPlugins : []),
    ...(!isProd ? developmentPlugins : []),
  ],
})
