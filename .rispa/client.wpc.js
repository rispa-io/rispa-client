import path from 'path'
import OfflinePlugin from 'offline-plugin'

const offline = process.env.NODE_ENV === 'production' && !process.env.DISABLE_OFFLINE

export default context => ({
  entry: [
    require.resolve('react-hot-loader/patch'),
    path.resolve(__dirname, '../src/client.js'),
  ],
  plugins: [
    new context.webpack.DefinePlugin({
      'process.env.DISABLE_REACT_DEVTOOLS': JSON.stringify(process.env.DISABLE_REACT_DEVTOOLS),
      'process.env.DISABLE_REDUX_DEVTOOLS': JSON.stringify(process.env.DISABLE_REDUX_DEVTOOLS),
      'process.env.DISABLE_OFFLINE': JSON.stringify(process.env.DISABLE_OFFLINE),
    }),
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
