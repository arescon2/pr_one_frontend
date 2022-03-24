import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './features/stores/mainSlice';
import settingsSlice from './features/stores/settingsSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    settings: settingsSlice
  },
})