const { PluginInstance } = require('@rispa/core')
const BabelPluginApi = require('@rispa/babel').default
const WebpackPluginApi = require('@rispa/webpack')
const clientWebpackConfig = require('./configs/client.wpc')
const babelConfig = require('./configs/babel.config')

class ClientPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.babel = context.get(BabelPluginApi.pluginName)
    this.webpack = context.get(WebpackPluginApi.pluginName)
  }

  start() {
    this.webpack.addClientEntry('main', require.resolve('../lib/clientEntry'))
    this.webpack.addClientConfig(clientWebpackConfig)

    this.babel.addConfig(babelConfig)
  }
}

module.exports = ClientPlugin
