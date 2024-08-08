import { apiSlice } from "../api/apiSlice";

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: ({ data }) => ({
        url: "create-article",
        method: "POST",
        body: { data },
        credentials: "include" as const,
      }),
    }),
    getAllArticles: builder.query({
      query: () => ({
        url: "get-all-articles",
        method: "GET",
      }),
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `get-article/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
} = articleApi;
