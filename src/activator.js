const WebpackPluginApi = require('@rispa/webpack')
const ClientPlugin = require('./ClientPlugin')

module.exports.default = ClientPlugin

module.exports.after = [WebpackPluginApi.pluginName]
