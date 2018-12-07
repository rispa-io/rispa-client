const OfflinePlugin = require('offline-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { group, env, defineConstants } = require('@webpack-blocks/webpack')

module.exports = group([
  (context, { merge }) => merge({
    plugins: [
      process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }) : null,
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'all',
            minChunks: Infinity,
          },
        },
      },
    },
  }),
  defineConstants({
    'process.env.DISABLE_REACT_DEVTOOLS': process.env.DISABLE_REACT_DEVTOOLS,
    'process.env.DISABLE_REDUX_DEVTOOLS': process.env.DISABLE_REDUX_DEVTOOLS,
    'process.env.DISABLE_OFFLINE': process.env.DISABLE_OFFLINE,
  }),
  env('development', [
    (context, { merge }) => merge({
      entry: {
        vendor: [
          require.resolve('react-hot-loader/patch'),
          require.resolve('bluebird'),
          require.resolve('react'),
          require.resolve('react-dom'),
          require.resolve('react-router'),
          require.resolve('react-router-dom'),
          require.resolve('prop-types'),
        ],
      },
      resolve: {
        alias: {
          react$: require.resolve('react'),
          'react-dom$': require.resolve('react-dom'),
          'react-router$': require.resolve('react-router'),
          'react-router-dom$': require.resolve('react-router-dom'),
          'prop-types$': require.resolve('prop-types'),
        },
      },
    }),
  ]),
  env('production', [
    (context, { merge }) => merge({
      entry: {
        vendor: [
          require.resolve('react/dist/react.min.js'),
          require.resolve('bluebird/js/browser/bluebird.min.js'),
          require.resolve('react-dom/dist/react-dom.min.js'),
          require.resolve('react-router/umd/react-router.min.js'),
          require.resolve('react-router-dom'),
          require.resolve('prop-types/prop-types.min.js'),
        ],
      },
      resolve: {
        alias: {
          react$: require.resolve('react/dist/react.min.js'),
          'react-dom$': require.resolve('react-dom/dist/react-dom.min.js'),
          'react-router$': require.resolve('react-router/umd/react-router.min.js'),
          'react-router-dom$': require.resolve('react-router-dom'),
          'prop-types$': require.resolve('prop-types/prop-types.min.js'),
        },
      },
      plugins: [
        !process.env.DISABLE_OFFLINE ? new OfflinePlugin({
          externals: [
            '/shell',
          ],
          ServiceWorker: {
            minify: true,
            events: true,
            navigateFallbackURL: '/shell',
          },
          AppCache: false,
        }) : null,
      ].filter(Boolean),
    }),
  ]),
])
