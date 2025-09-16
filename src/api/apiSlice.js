import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("x-auth-token", token);
    }
    headers.set("ngrok-skip-browser-warning", "skip-browser-warning");
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const errorData = result.error.data;
    if (
      errorData?.success === false &&
      errorData?.message.includes("Unauthorized")
    ) {
      api.dispatch(logout());
      api.dispatch(api.util.resetApiState());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  tagTypes: [
    "inspectionForms",
    "assignedTask",
    "unAssignedTask",
    "certificates",
    "users",
    "orders",
    "userCustomers",
  ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "userAuth/login",
        method: "POST",
        body: payload,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "userAuth/resetPassword",
        method: "POST",
        body: payload,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "userAuth/verifyOtp",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "userAuth/updatePassword",
        method: "POST",
        body: payload,
      }),
    }),
    // ///////////////////// InspectionForm
    addInspectionForm: builder.mutation({
      query: (payload) => ({
        url: "inspectionForm/addInspectionForm",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["inspectionForms"],
    }),
    getAllInspectionForm: builder.query({
      query: ({ page, limit, title, filterBy }) => ({
        url: "inspectionForm/getAllInspections",
        method: "GET",
        params: { page, limit, title, filterBy },
      }),
      providesTags: ["inspectionForms"],
    }),
    getAllInspectionFormForDropDown: builder.query({
      query: () => ({
        url: "inspectionForm/getAllInspectionsForm",
        method: "GET",
      }),
      providesTags: ["inspectionForms"],
    }),

    getInspectionFormById: builder.query({
      query: (id) => ({
        url: `inspectionForm/getInspectionform/${id}`,
        method: "GET",
      }),
    }),
    updateInspectionFormStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `inspectionForm/updateInspectionFormStatus?id=${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["inspectionForms"],
    }),
    deleteInspectionForm: builder.mutation({
      query: (id) => ({
        url: `inspectionForm/deleteInspectionForm/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inspectionForms"],
    }),

    getAllAssignedTask: builder.query({
      query: ({ page, limit, priority, filterBy }) => ({
        url: "task/getAllAssignedTasks",
        method: "GET",
        params: { page, limit, priority, filterBy },
      }),
      providesTags: ["assignedTask"],
    }),
    getAllUnAssignedTask: builder.query({
      query: ({ page, limit, customer_first_name }) => ({
        url: "task/unAssignedZuperTasks",
        method: "GET",
        params: { page, limit, customer_first_name },
      }),
      providesTags: ["unAssignedTask"],
    }),
    getTaskById: builder.query({
      query: (id) => ({
        url: `task/getTask/${id}`,
        method: "GET",
      }),
    }),
    addAssignTask: builder.mutation({
      query: (payload) => ({
        url: "task/addAssignTask",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["assignedTask", "unAssignedTask"],
    }),
    getInspectionTasksByType: builder.query({
      query: ({ id, type }) => ({
        url: `/inspectionReport/getAllReportsByType?taskId=${id}&type=${type}`,
        method: "GET",
      }),
    }),
    updateInspectionForm: builder.mutation({
      query: ({ id, payload }) => ({
        url: `inspectionForm/updateInspectionForm/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["inspectionForms"],
    }),
    dublicateForm: builder.mutation({
      query: (id) => ({
        url: `/inspectionForm/addDuplicateForm?formId=${id}`,
        method: "GET",
      }),
      invalidatesTags: ["inspectionForms"],
    }),

    // ////////////////////inspector Task

    addInspectionReport: builder.mutation({
      query: (payload) => ({
        url: `inspectionReport/createReport`,
        method: "POST",
        body: payload,
      }),
    }),
    addPostInspection: builder.mutation({
      query: (payload) => ({
        url: `inspectionReport/savePostInspection`,
        method: "POST",
        body: payload,
      }),
    }),
    getPrePostreportById: builder.query({
      query: (id) => ({
        url: `inspectionReport/getPreAndPostReports?taskId=${id}`,
        method: "GET",
      }),
    }),
    // ///////////////////// Inspector
    getAllInspectors: builder.query({
      query: () => ({
        url: "user/getAllInspectors",
        method: "GET",
      }),
    }),
    // ///////////////////// Customer
    getAllCustomer: builder.query({
      query: ({ page, limit, customer_first_name }) => ({
        url: "customer/customers",
        method: "GET",
        params: { page, limit, customer_first_name },
      }),
    }),
    getAllZuperCustomersForDropdown: builder.query({
      query: () => ({
        url: "customer/customers",
        method: "GET",
      }),
    }),
    getAllCustomerForDropdown: builder.query({
      query: () => ({
        url: "user/getAllCustomers",
        method: "GET",
      }),
      providesTags: ["userCustomers"],
    }),

    getCustomerById: builder.query({
      query: (id) => ({
        url: `customer/getZuperCustomer/${id}`,
        method: "GET",
      }),
    }),
    inspectorsDashboard: builder.query({
      query: () => ({
        url: "task/dashBoardSummary",
        method: "GET",
      }),
    }),
    dashboardJobType: builder.query({
      query: () => ({
        url: "inspectionReport/getPremisesTypeCount",
        method: "GET",
      }),
    }),
    dashboardOrderAnalytics: builder.query({
      query: () => ({
        url: "/inspectionReport/getPremisesTypeCountByMonth",
        method: "GET",
      }),
    }),

    // ///////////////////// Certificates
    getAllCertificates: builder.query({
      query: ({ page, limit, ratingType, filterBy }) => ({
        url: "certificate/getAllCertificates",
        method: "GET",
        params: { page, limit, ratingType, filterBy },
      }),
      providesTags: ["certificates"],
    }),
    addCertificate: builder.mutation({
      query: (payload) => ({
        url: "certificate/addCertificate",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["certificates"],
    }),
    getCertificateById: builder.query({
      query: (id) => ({
        url: `certificate/getCertificate/${id}`,
        method: "GET",
      }),
    }),
    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `certificate/deleteCertificates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["certificates"],
    }),
    updateCertificate: builder.mutation({
      query: ({ id, payload }) => ({
        url: `certificate/updatedCertificate/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["certificates"],
    }),
    getDashoardCertificates: builder.query({
      query: () => ({
        url: "certificate/dashBoardCertificates",
        method: "GET",
      }),
      providesTags: ["certificates"],
    }),

    // ///////////////////// User
    addUser: builder.mutation({
      query: (payload) => ({
        url: `userAuth/addUser`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["users", "userCustomers"],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit, fullName, filterBy }) => ({
        url: `user/getUsers`,
        method: "GET",
        params: { page, limit, fullName, filterBy },
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/user/updateUserStatus/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/user/updateUser/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `user/getUser/${id}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `user/updateProfile`,
        method: "PUT",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: `user/updatePassword`,
        method: "PUT",
        body: payload,
      }),
    }),

    // /////////////////////// Ai Suggestions
    getAiSuggestions: builder.mutation({
      query: (payload) => ({
        url: `/inspectionReport/analyzeImageAI`,
        method: "POST",
        body: payload,
      }),
    }),
    getAiSuggestionsForMultipleImages: builder.mutation({
      query: (payload) => ({
        url: `/inspectionReport/analyzeMultipleImages`,
        method: "POST",
        body: payload,
      }),
    }),
    getInspectionReports: builder.query({
      query: ({ page, limit, completedDate, createdAt, status }) => ({
        url: `inspectionReport/getAllReports`,
        method: "GET",
        params: { page, limit, completedDate, createdAt, status },
      }),
      providesTags: ["reports"],
    }),
    getPdf: builder.mutation({
      query: (id) => ({
        url: `inspectionReport/resyncInspectionReportToZuper/${id}`,
        // url: `inspectionReport/downloadReport/${id}`,
        method: "POST",
      }),
    }),
    // /////////////////////// Market Place
    getAllMarketPlace: builder.query({
      query: ({ page, limit, serviceName, filterBy }) => ({
        url: `marketPlace/allMarketPlaces`,
        method: "GET",
        params: { page, limit, serviceName, filterBy },
      }),
      providesTags: ["marketPlace"],
    }),
    deleteMarketPlace: builder.mutation({
      query: (id) => ({
        url: `marketPlace/deleteMarketPlace?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["marketPlace"],
    }),
    addMarketPlaceService: builder.mutation({
      query: (payload) => ({
        url: `marketPlace/addMarketPlace`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["marketPlace"],
    }),
    updateMarketPlace: builder.mutation({
      query: ({ id, payload }) => ({
        url: `marketPlace/updatedMarketPlaces/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["marketPlace"],
    }),
    getMasterPlaceById: builder.query({
      query: (id) => ({
        url: `marketPlace/marketPlaceById?id=${id}`,
        method: "GET",
      }),
    }),
    // /////////////////////// Orders
    getAllOrders: builder.query({
      query: ({ page, limit, filterBy, status }) => ({
        url: `order/allOrders`,
        method: "GET",
        params: { page, limit, filterBy, status },
      }),
      providesTags: ["orders"],
    }),
    getAllOrdersWithCalendar: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/order/allOrders?startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    // deleteOrder: builder.mutation({
    //   query: (id) => ({
    //     url: `marketPlace/deleteMarketPlace?id=${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["orders"],
    // }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `order/orderById?id=${id}`,
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, payload }) => ({
        url: `order/updateOrder/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
    // /////////////////////// home owner
    homneOwnerDashboard: builder.query({
      query: () => ({
        url: "/inspectionReport/getDashboardData",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useAddInspectionFormMutation,
  useGetAllAssignedTaskQuery,
  useGetTaskByIdQuery,
  useGetAllInspectionFormQuery,
  useUpdateInspectionFormStatusMutation,
  useDeleteInspectionFormMutation,
  useGetAllUnAssignedTaskQuery,
  useGetAllInspectorsQuery,
  useAddAssignTaskMutation,
  useGetAllCustomerQuery,
  useGetCustomerByIdQuery,
  useGetAllCertificatesQuery,
  useAddCertificateMutation,
  useGetCertificateByIdQuery,
  useDeleteCertificateMutation,
  useUpdateCertificateMutation,
  useAddUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useAddInspectionReportMutation,
  useGetAiSuggestionsMutation,
  useGetInspectionTasksByTypeQuery,
  useGetAiSuggestionsForMultipleImagesMutation,
  useAddPostInspectionMutation,
  useGetInspectionReportsQuery,
  useGetPrePostreportByIdQuery,
  useGetPdfMutation,
  useGetAllMarketPlaceQuery,
  useDeleteMarketPlaceMutation,
  useAddMarketPlaceServiceMutation,
  useUpdateMarketPlaceMutation,
  useGetMasterPlaceByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useGetAllOrdersWithCalendarQuery,
  useGetOrderByIdQuery,
  useUpdateInspectionFormMutation,
  useDublicateFormMutation,
  useGetInspectionFormByIdQuery,
  useInspectorsDashboardQuery,
  useGetDashoardCertificatesQuery,
  useHomneOwnerDashboardQuery,
  useDashboardJobTypeQuery,
  useDashboardOrderAnalyticsQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetAllInspectionFormForDropDownQuery,
  useGetAllCustomerForDropdownQuery,
  useGetAllZuperCustomersForDropdownQuery,
} = api;
