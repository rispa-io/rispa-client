const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const ClientPlugin = require('./ClientPlugin')

module.exports.default = ClientPlugin

module.exports.after = [WebpackPluginApi.pluginName, BabelPluginApi.pluginName]
