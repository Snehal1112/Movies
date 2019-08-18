import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from './reducers';

const initState = {};
const middleware = [ Thunk ];
export const store = createStore(rootReducer, initState, applyMiddleware(...middleware));
