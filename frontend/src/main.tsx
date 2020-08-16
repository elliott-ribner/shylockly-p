import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from 'ui/App'
import reducer from 'store/reducer'
import { mainSaga } from 'store/sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))
sagaMiddleware.run(mainSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
