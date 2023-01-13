import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rdcPrimarySideBar from './reducers';

const rootReducer = combineReducers({
  rdcPrimarySideBar,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
