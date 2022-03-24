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

export const OrganizationSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {
    setOrgsList: (state, action) => {
      state.list = [...action.payload.data]
      state.total = action.payload.count
    },
    setOrgsForm: (state, action) => {
      state.formOne = {...action.payload}
    },
    setOrgsPagin: (state, action) => {
      state.pagination = {...state.pagination, page: action.payload.page, limit: action.payload.limit}
    },
  }
});

export const { setOrgsList, setOrgsForm, setOrgsPagin } = OrganizationSlice.actions

export default OrganizationSlice.reducer