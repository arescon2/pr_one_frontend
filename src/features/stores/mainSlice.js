import { createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';

const initialState = {
  loadingGlobal: true,
  mainMenu: [],
  logined: false,
  user: {}
}

export const mainSlice = createSlice({
  name: 'main_store',
  initialState,
  reducers: {
    setMainMenu: (state, action) => {
      state.mainMenu = [...action.payload]
    },
    setLogined: (state, action) => {
      let status = action.payload;
      let user = {};
      if (_.isObject(action.payload)) {
        status = action.payload.status;
        user = action.payload.user;
      }
      state.logined = status;
      state.user = user;
    },
    setLoading: (state, action) => {
      state.loadingGlobal = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    }
  }
})

export const { setMainMenu, setLogined, setLoading, setPageTitle } = mainSlice.actions

export default mainSlice.reducer