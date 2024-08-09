import { apiSlice } from "../api/apiSlice";

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (data) => ({
        url: "create-article",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllArticles: builder.query({
      query: ({ page = 1, search = "" }) => ({
        url:`get-all-articles?page=${page}&search=${search}`,
        method: "GET",
      }),
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `get-article/${id}`,
        method: "GET",
      }),
    }),
    updateArticle: builder.mutation({
      query: (data) => ({
        url: `edit-article/${data._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `delete-article/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
