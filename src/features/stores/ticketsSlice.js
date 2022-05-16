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

export const TicketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTicketList: (state, action) => {
      state.list = [...action.payload.data]
      state.total = action.payload.count
    },
    setTicketForm: (state, action) => {
      state.formOne = {...action.payload}
    },
    setTicketPagin: (state, action) => {
      state.pagination = {...state.pagination, page: action.payload.page, limit: action.payload.limit}
    },
  }
});

export const { setTicketList, setTicketForm, setTicketPagin } = TicketsSlice.actions;

export default TicketsSlice.reducer;