import { QUERY_PARAM_EDIT } from "../query-params"

export const paths = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  logout: "/dashboard/logout",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",
  tags: "/tags",

  // Get the URL for the tag read page
  tag_read: (id: string) => `/tags/${id}`,

  // Get the URL for the tag edit page
  tag_edit: (id: string) => `/tags/${id}/edit`,
  tag_edit_not_allow: (id: string) =>
    `/tags/${id}?${QUERY_PARAM_EDIT.not_allow}=true`,

  // Get the URL for the post read page
  post_read: (id: string) => `/post/${id}`,

  // Available for admin, editor
  post_create: "/post/create",

  // Available for admin, editor
  // Get the URL for the post edit page
  post_edit: (id: string) => `/post/${id}/edit`,
  post_edit_not_allow: (id: string) =>
    `/post/${id}?${QUERY_PARAM_EDIT.not_allow}=true`,

  // Available for admin, editor
  tag_create: "/tags/create",

  // Available for admin
  update_role: "/dashboard/update/role",
}
