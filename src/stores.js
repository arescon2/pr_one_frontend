import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './features/stores/mainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
})