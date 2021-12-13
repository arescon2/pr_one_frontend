import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingGlobal: true,
  mainMenu: [],
  logined: true,
  pageTitle: ''
}

export const mainSlice = createSlice({
  name: 'main_store',
  initialState,
  reducers: {
    setMainMenu: (state, action) => {
      state.mainMenu = [...action.payload]
    },
    setLogined: (state, action) => {
      state.logined = action.payload;
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