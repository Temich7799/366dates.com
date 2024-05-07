import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const authApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/auth/sign-in',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    me: builder.query({
      query: () => '/api/auth/me',
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApi;
