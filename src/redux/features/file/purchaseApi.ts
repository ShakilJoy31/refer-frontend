import { apiSlice } from "@/redux/api/apiSlice";

interface PurchaseData {
  referredBy: string;      // The person who referred this user
  purchasedReferId: string; // The referral ID for this purchase
}

const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    purchase: builder.mutation({
      query: (data: PurchaseData) => ({
        url: "/purchase-book",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { usePurchaseMutation } = purchaseApi;