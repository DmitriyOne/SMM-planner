export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  settings: "/settings",

  // Get the URL for the post read page
  post_read: (id: string) => `/post/${id}`,

  // Available for admin, editor
  post_create: "/post/create",

  // Available for admin, editor
  // Get the URL for the post edit page
  post_edit: (id: string) => `/post/${id}/edit`,

  // Available for admin
  update_role: "/update/role",
}
