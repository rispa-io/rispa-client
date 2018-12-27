const { PluginInstance } = require('@rispa/core')
const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const clientWebpackConfig = require('./configs/client.wpc')
const babelConfig = require('./configs/babel.config')

class ClientPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.webpack = context.get(WebpackPluginApi.pluginName)
    this.babel = context.get(BabelPluginApi.pluginName)
  }

  start() {
    this.webpack.addClientConfig(clientWebpackConfig)
    this.babel.addConfig(babelConfig)
  }
}

module.exports = ClientPlugin
