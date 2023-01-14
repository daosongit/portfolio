import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './reducers';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
