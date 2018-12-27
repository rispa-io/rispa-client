const path = require('path')
const OfflinePlugin = require('offline-plugin')
const { group, env, defineConstants, entryPoint } = require('@webpack-blocks/webpack')

module.exports = group([
  entryPoint({
    client: [
      path.resolve(__dirname, '../../lib/entry.js'),
    ],
  }),

  defineConstants({
    'process.env.DISABLE_REACT_DEVTOOLS': process.env.DISABLE_REACT_DEVTOOLS,
    'process.env.DISABLE_REDUX_DEVTOOLS': process.env.DISABLE_REDUX_DEVTOOLS,
    'process.env.DISABLE_OFFLINE': process.env.DISABLE_OFFLINE,
  }),

  env('development', [
    (context, { merge }) => merge({
      entry: {
        vendors: [
          require.resolve('react-hot-loader'),
        ],
      },
    }),
  ]),

  env('production', [
    (context, { merge }) => merge({
      // This plugin is intended to provide an offline experience for webpack projects.
      // It uses ServiceWorker, and AppCache as a fallback under the hood.
      // https://github.com/NekR/offline-plugin
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
