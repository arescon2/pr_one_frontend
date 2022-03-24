import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  total: 0,
  pagination: {
    page: 1,
    limit: 10,
  },
  formOne: {}
}

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList: (state, action) => {
      state.list = [...action.payload.data]
      state.total = action.payload.count
    },
    setUsersForm: (state, action) => {
      state.formOne = {...action.payload}
    },
    setUsersPagin: (state, action) => {
      state.pagination = {...state.pagination, page: action.payload.page, limit: action.payload.limit}
    },
  }
});

export const { setUsersList, setUsersForm, setUsersPagin } = UsersSlice.actions

export default UsersSlice.reducer