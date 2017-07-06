/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */
import componentGenerator from './component'
import containerGenerator from './container'
import reduxGenerator from './redux'
import reduxModuleGenerator from './redux-module'
import featurePluginGenerator from './feature-plugin'

export default plop => {
  plop.addHelper('properRoute', route => `/${route.replace(/^\//, '')}`)

  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('redux', reduxGenerator)
  plop.setGenerator('redux-module', reduxModuleGenerator)
  plop.setGenerator('feature-plugin', featurePluginGenerator)
}
