import { combineReducers, createStore } from 'redux';
import { accountReducer } from './slices/accountSlice';
import { registrationReducer } from "./slices/registrationSlice";

const combinedReducer = combineReducers({
  account: accountReducer,
  registration: registrationReducer,
});

const store = createStore(
  combinedReducer
);

export default store;
