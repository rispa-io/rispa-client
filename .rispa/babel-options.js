const resolve = require.resolve

export default () => ({
  env: {
    production: {
      plugins: [
        resolve('babel-plugin-transform-react-constant-elements'),
        resolve('babel-plugin-transform-react-inline-elements'),
        resolve('babel-plugin-transform-react-remove-prop-types'),
      ],
    },
    development: {
      plugins: [
        resolve('react-hot-loader/babel'),
      ],
    },
  },
})
