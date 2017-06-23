import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

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
  ].filter(Boolean),
})
