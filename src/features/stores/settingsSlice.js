import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  total: 0,
  pagination: {
    page: 1,
    limit: 10,
  },
  settingFormOne: {}
}

export const settingsSlice = createSlice({
  name: 'settings_store',
  initialState,
  reducers: {
    setSettingList: (state, action) => {
      state.list = [...action.payload.data]
      state.total = action.payload.count
    },
    setSettingForm: (state, action) => {
      state.settingFormOne = {...action.payload}
    },
    setPaginationSetting: (state, action) => {
      state.pagination = {...state.pagination, page: action.payload.page, limit: action.payload.limit}
    },
  }
})

export const { setSettingList, setSettingForm, setPaginationSetting } = settingsSlice.actions

export default settingsSlice.reducer