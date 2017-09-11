import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import api from './middleware'
import App from './components/App'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk, api, createLogger())
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
