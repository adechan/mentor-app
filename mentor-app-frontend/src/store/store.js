import { combineReducers, createStore } from 'redux';
import { accountReducer } from './slices/accountSlice';
import { registrationReducer } from "./slices/registrationSlice";

const combinedReducer = combineReducers({
  account: accountReducer,
  registration: registrationReducer,
});

const store = createStore(
  combinedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
);

export default store;
