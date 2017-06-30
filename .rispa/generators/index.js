/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */
import path from 'path'
import spawn from 'cross-spawn'
import componentGenerator from './component'
import containerGenerator from './container'
import reduxGenerator from './redux'
import reduxModuleGenerator from './redux-module'
import featurePluginGenerator from './feature-plugin'

export default plop => {
  plop.setActionType('bootstrap', () => {
    const cwd = path.resolve(process.cwd(), '../')
    spawn.sync('lerna', ['bootstrap'], { stdio: 'inherit', cwd })
    return 'Bootstrap completed'
  })

  plop.addHelper('properRoute', (route) => {
    return `/${route.replace(/^\//, '')}`
  })

  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('redux', reduxGenerator)
  plop.setGenerator('redux-module', reduxModuleGenerator)
  plop.setGenerator('feature-plugin', featurePluginGenerator)
}
