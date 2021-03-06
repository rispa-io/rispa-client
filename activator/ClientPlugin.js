const { PluginInstance } = require('@rispa/core')
const WebpackPluginApi = require('@rispa/webpack')
const clientWebpackConfig = require('./configs/client.wpc')

class ClientPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.webpack = context.get(WebpackPluginApi.pluginName)
  }

  start() {
    this.webpack.addClientEntry('main', require.resolve('../lib/clientEntry'))
    this.webpack.addClientConfig(clientWebpackConfig)
  }
}

module.exports = ClientPlugin
