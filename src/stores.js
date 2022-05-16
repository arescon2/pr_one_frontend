import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './features/stores/mainSlice';
import organizationSlice from './features/stores/orgsSlice';
import rolesSlice from './features/stores/rolesSlice';
import ticketsSlice from './features/stores/ticketsSlice';
import usersSlice from './features/stores/usersSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    orgs: organizationSlice,
    users: usersSlice,
    roles: rolesSlice,
    tickets: ticketsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})