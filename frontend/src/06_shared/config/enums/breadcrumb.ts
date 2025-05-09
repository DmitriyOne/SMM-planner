export const BreadcrumbsTypes = {
  EMPTY: "empty",
  POST_READ: "post_read",
  POST_EDIT: "post_edit",
  TAGS: "tags",
} as const

export type BreadcrumbsTypes =
  (typeof BreadcrumbsTypes)[keyof typeof BreadcrumbsTypes]
