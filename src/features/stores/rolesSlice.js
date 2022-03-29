import { createSlice } from '@reduxjs/toolkit'
import { OrganizationSlice } from './orgsSlice'

const initialState = {
  list: [],
  total: 0,
  pagination: {
    page: 1,
    limit: 10,
  },
  formOne: {}
}

export const RolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRolesList: (state, action) => {
      state.list = [...action.payload.data]
      state.total = action.payload.count
    },
    setRolesForm: (state, action) => {
      state.formOne = {...action.payload}
    },
    setRolesPagin: (state, action) => {
      state.pagination = {...state.pagination, page: action.payload.page, limit: action.payload.limit}
    },
  }
});
export const { setRolesList, setRolesForm, setRolesPagin } = RolesSlice.actions

export default RolesSlice.reducer