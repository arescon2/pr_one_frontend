import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingGlobal: true,
  mainMenu: [],
  logined: true
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
      state.loadingGlobal = action.payload
    },
  },
})

export const { setMainMenu, setLogined, setLoading } = mainSlice.actions

export default mainSlice.reducer