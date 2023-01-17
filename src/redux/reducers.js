import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const primarySideBarSlice = createSlice({
  name: 'primarySideBarSlice',
  initialState: {},
  reducers: {
    updateSideBar(state, action) {
      state.key = action.payload.key;
      state.isShown = action.payload.isShown;
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
  rdcPrimarySideBar: primarySideBarSlice.reducer,
  rdcTabs: tabsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['rdcTabs'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const { updateSideBar } = primarySideBarSlice.actions;
export const { addTab, updateLink, removeTab } = tabsSlice.actions;
export default persistedReducer;
