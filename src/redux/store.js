import { createStore, applyMiddleware , combineReducers} from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as homeReducer } from './home-redux'
import rootSaga from '../saga'
import history from '../services/history'

const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const rootReducer = combineReducers({
    home: homeReducer
  })
// mount it on the Store
const store = createStore(
    rootReducer,
  applyMiddleware(sagaMiddleware, routeMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)
export default store