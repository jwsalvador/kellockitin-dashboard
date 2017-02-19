import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import rootReducer from 'ducks';

export default (initialState) => {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, ReduxPromise)
  );

};