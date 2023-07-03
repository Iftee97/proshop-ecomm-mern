import { apiSlice } from "./apiSlice"
import { ORDERS_URL } from "../constants"

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    // admin endpoints
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice