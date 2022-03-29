import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './features/stores/mainSlice';
import OrganizationSlice from './features/stores/orgsSlice';
import rolesSlice from './features/stores/rolesSlice';
import UsersSlice from './features/stores/usersSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    orgs: OrganizationSlice,
    users: UsersSlice,
    roles: rolesSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})