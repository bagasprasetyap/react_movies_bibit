// import { createStore } from 'redux';
// import rootReducer from './rootReducer';

// const store = createStore(rootReducer);

// export default store;

import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
// import { useRouterHistory } from 'react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from '../sagas';

const history = createBrowserHistory({ basename: 'dev', forceRefresh: false });
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware];
const enhancerList = [];
enhancerList.push(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(...enhancerList),
);
sagaMiddleware.run(rootSaga);
export { store, history };
