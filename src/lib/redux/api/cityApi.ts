import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { CityResponse } from "@/ts/CityResponseType";

export const cityApi = createApi({
    baseQuery,
    endpoints: (builder) => ({
        getCities: builder.query<{ data: CityResponse[] }, string>({
            query: (city) => `/api/getCities?city=${city}`,
        }),
    }),
});

export const {
    useGetCitiesQuery,
    useLazyGetCitiesQuery
} = cityApi;
