import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: { key: 'Dark', cssSelector: 'dark-theme' },
  reducers: {
    changeTheme(state, action) {
      state.key = action.payload.key;
      state.cssSelector = action.payload.cssSelector;
    },
  },
});

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: { value: [] },
  reducers: {
    addTab(state, action) {
      if (state.value.find((a) => a.tabName === action.payload.tabName)) return;
      else state.value.push(action.payload);
    },
    updateLink(state, action) {
      state.value = state.value.map((itm) => {
        if (itm.tabName === action.payload.tabName) itm.link = action.payload.link;
        return itm;
      });
    },
    removeTab(state, action) {
      state.value = state.value.filter((a) => a.tabName !== action.payload);
    },
  },
});

const rootReducer = combineReducers({
  rdcTheme: themeSlice.reducer,
  rdcTabs: tabsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['rdcTabs', 'rdcTheme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const { changeTheme } = themeSlice.actions;
export const { addTab, updateLink, removeTab } = tabsSlice.actions;
export default persistedReducer;
