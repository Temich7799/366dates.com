import { User } from "@/ts/UserType";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GetUserQuery } from "@/ts/GetUserQueryType";

export const userApi = createApi({
    baseQuery,
    endpoints: (builder) => ({
        addFriendship: builder.mutation<void, { userId: string, friendId: string }>({
            query: ({ userId, friendId }) => ({
                url: '/api/addFriendship',
                method: 'POST',
                body: { userId, friendId },
            }),
        }),
        getAllUserFriends: builder.query<User[], string>({
            query: (userId) => `/api/getAllUserFriends?userId=${userId}`,
        }),
        getAllUsers: builder.query<User[], GetUserQuery>({
            query: ({ birthday, city }) => `/api/getAllUsers?birthday=${birthday}&city=${city}`,
        }),
    }),
});

export const {
    useAddFriendshipMutation,
    useGetAllUserFriendsQuery,
    useGetAllUsersQuery,
    useLazyGetAllUsersQuery,
} = userApi;