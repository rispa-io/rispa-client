'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _redux = require('@rispa/redux');

var _reactCookie = require('react-cookie');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('@rispa/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

var reduxDevtoolCompose = !process.env.DISABLE_REDUX_DEVTOOLS ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
: null;

var store = (0, _redux.configureStore)(history, window.RISPA_INITIAL_STATE, reduxDevtoolCompose);
var when = (0, _redux.createWhen)(store, window.RISPA_INITIAL_STATE);
var cookies = new _reactCookie.Cookies();

var render = function render(getRoutes) {
  _reactDom2.default.render(_react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(
      _redux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactCookie.CookiesProvider,
        null,
        _react2.default.createElement(
          _redux.ConnectedRouter,
          { history: history },
          getRoutes({ store: store, when: when, cookies: cookies })
        )
      )
    )
  ), document.getElementById('root'));
};

render(_routes2.default);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('@rispa/routes', function () {
    when.clear();
    var newRoutes = require('@rispa/routes').default; // eslint-disable-line global-require
    render(newRoutes);
  });
}

//
// disable react-devtools for production
//
/* eslint-disable no-underscore-dangle */
if (process.env.DISABLE_REACT_DEVTOOLS && window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && (0, _keys2.default)(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
}

//
// offline setup
//
if (process.env.NODE_ENV === 'production' && !process.env.DISABLE_OFFLINE) {
  /* eslint-disable global-require */
  require('offline-plugin/runtime').install();
}