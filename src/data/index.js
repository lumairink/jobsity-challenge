import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './combineReducers';
import sagas from './combineSagas';

// const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  /* sagaMiddleware */
];

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(reducers, composer);

// sagaMiddleware.run(sagas);

export default store;
