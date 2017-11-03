/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */
const componentGenerator = require('./component')
const containerGenerator = require('./container')
const reduxGenerator = require('./redux')
const reduxModuleGenerator = require('./redux-module')
const featurePluginGenerator = require('./feature-plugin')
const featurePluginGeneratorWithoutRoute = require('./feature-plugin-without-route')

module.exports = plop => {
  plop.addHelper('properRoute', route => `/${route.replace(/^\//, '')}`)

  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('redux', reduxGenerator)
  plop.setGenerator('redux-module', reduxModuleGenerator)
  plop.setGenerator('feature-plugin', featurePluginGenerator)
  plop.setGenerator('feature-plugin-without-route', featurePluginGeneratorWithoutRoute)
}
