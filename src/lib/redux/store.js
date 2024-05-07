import {
  configureStore
} from '@reduxjs/toolkit';
import {
  authApi
} from './api/authApi';
import {
  userApi
} from './api/userApi';
import {
  cityApi
} from './api/cityApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      cityApi.middleware
    ),
});