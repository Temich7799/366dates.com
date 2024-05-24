import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const authApi: any = createApi({
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
      query: (userId) => ({
        url: `/api/auth/me?userId=${userId}`,
        credentials: 'include'
      }),
    }),
    remind: builder.mutation({
      query: (email) => ({
        url: `/api/remind`,
        method: 'POST',
        body: {
          email
        }
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLazyMeQuery, useRemindMutation } = authApi;
