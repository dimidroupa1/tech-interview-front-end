import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updatedAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: {avatar},
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({ name, email }) => ({
                url: "update-user-info",
                method: "PUT",
                body: {
                    name,
                    email,
                },
                credentials: "include" as const
            })
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword,
                },
                credentials: "include" as const
            })
        }),
    })
})

export const { useUpdatedAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation } = userApi