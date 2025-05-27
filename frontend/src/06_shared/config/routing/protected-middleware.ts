import { paths } from "./paths"

export const protectedRoutes = [
  "/dashboard/:path*",
  "/post/:id/edit",
  paths.tag_create,
  paths.post_create,
]
