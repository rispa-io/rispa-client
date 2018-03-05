module.exports = () => ({
  env: {
    production: {
      plugins: [
        require.resolve('babel-plugin-transform-react-constant-elements'),
        require.resolve('babel-plugin-transform-react-inline-elements'),
        require.resolve('babel-plugin-transform-react-remove-prop-types'),
      ],
    },
    development: {
      plugins: [
        require.resolve('react-hot-loader/babel'),
      ],
    },
  },

  presets: [
    require.resolve('babel-preset-react'),
  ],
})
