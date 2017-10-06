const WebpackPluginApi = require('@rispa/webpack')
const ClientPlugin = require('../src/ClientPlugin')

function init(context, config) {
  return new ClientPlugin(context, config)
}

const after = [WebpackPluginApi.pluginName]

module.exports = init

module.exports.after = after
