import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import {
  Provider,
  ConnectedRouter,
  configureStore,
  createWhen,
} from '@rispa/redux'
import { CookiesProvider, Cookies } from 'react-cookie'
import createHistory from 'history/createBrowserHistory'
import routes from '@rispa/routes'

const history = createHistory()

const reduxDevtoolCompose = !process.env.DISABLE_REDUX_DEVTOOLS
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
  : null

const store = configureStore({
  history,
  data: window.RISPA_INITIAL_STATE,
  customCompose: reduxDevtoolCompose,
})
const when = createWhen({ store })
const cookies = new Cookies()

const render = getRoutes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <CookiesProvider>
          <ConnectedRouter history={history}>
            {getRoutes({ store, when, cookies })}
          </ConnectedRouter>
        </CookiesProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(routes)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('@rispa/routes', () => {
    when.clear()
    const newRoutes = require('@rispa/routes').default // eslint-disable-line global-require
    render(newRoutes)
  })
}

//
// disable react-devtools for production
//
/* eslint-disable no-underscore-dangle */
if (
  process.env.DISABLE_REACT_DEVTOOLS &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
}

//
// offline setup
//
if (process.env.NODE_ENV === 'production' && !process.env.DISABLE_OFFLINE) {
  /* eslint-disable global-require */
  require('offline-plugin/runtime').install()
}
