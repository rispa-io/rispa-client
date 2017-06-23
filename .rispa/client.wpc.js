import path from 'path'
import OfflinePlugin from 'offline-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const offline = process.env.NODE_ENV === 'production' && !process.env.DISABLE_OFFLINE

export default context => ({
  entry: [
    require.resolve('react-hot-loader/patch'),
    path.resolve(__dirname, '../src/client.js'),
  ],
  resolve: {
    alias: {
      react$: require.resolve('react'),
      'react-dom$': require.resolve('react-dom'),
    },
  },
  plugins: [
    new context.webpack.DefinePlugin({
      'process.env.DISABLE_REACT_DEVTOOLS': JSON.stringify(process.env.DISABLE_REACT_DEVTOOLS),
      'process.env.DISABLE_REDUX_DEVTOOLS': JSON.stringify(process.env.DISABLE_REDUX_DEVTOOLS),
      'process.env.DISABLE_OFFLINE': JSON.stringify(process.env.DISABLE_OFFLINE),
    }),
    new context.webpack.ProvidePlugin({
      Promise: require.resolve('bluebird'),
    }),
    new context.webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && (
          /node_modules(\\|\/)react(\\|\/)lib/.test(module.context) ||
          /node_modules(\\|\/)react-dom(\\|\/)lib/.test(module.context) ||
          /node_modules(\\|\/)bluebird/.test(module.context)
        ),
    }),
    process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }) : null,
    offline ? new OfflinePlugin({
      externals: [
        '/shell',
      ],
      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/shell',
      },
      AppCache: false,
    }) : null,
  ].filter(Boolean),
})
