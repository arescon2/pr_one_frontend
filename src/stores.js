import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './features/stores/mainSlice';
import OrganizationSlice from './features/stores/orgsSlice';
import UsersSlice from './features/stores/usersSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    orgs: OrganizationSlice,
    users: UsersSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})