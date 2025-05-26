import { TBreadcrumbSegment } from "@/05_entities/breadcrumb-item/model"
import { paths } from "./routing"
import { TBreadcrumbParams } from "../lib/breadcrumbs"
import { BreadcrumbsTypes } from "./enums/breadcrumb"

const HOME_BREADCRUMB: TBreadcrumbSegment = {
  label: "Home",
  href: paths.home,
}

const ALL_TAGS_BREADCRUMB: TBreadcrumbSegment = {
  label: "All tags",
  href: paths.tags,
}

export const breadcrumbConfig: Record<
  BreadcrumbsTypes,
  (params: TBreadcrumbParams) => TBreadcrumbSegment[]
> = {
  [BreadcrumbsTypes.POST_READ]: ({ postId }) => [
    HOME_BREADCRUMB,
    {
      label: `Post #${postId}`,
      href: paths.post_read(postId || ""),
    },
  ],
  [BreadcrumbsTypes.POST_EDIT]: ({ postId }) => [
    HOME_BREADCRUMB,
    { label: `Post #${postId}`, href: paths.post_read(postId || "") },
  ],
  [BreadcrumbsTypes.TAGS]: () => [HOME_BREADCRUMB, ALL_TAGS_BREADCRUMB],
  [BreadcrumbsTypes.TAG_READ]: ({ tagId }) => [
    HOME_BREADCRUMB,
    ALL_TAGS_BREADCRUMB,
    { label: `Tag #${tagId}`, href: paths.tag_read(tagId || "") },
  ],
  [BreadcrumbsTypes.TAG_EDIT]: ({ tagId }) => [
    HOME_BREADCRUMB,
    ALL_TAGS_BREADCRUMB,
    { label: `Tag #${tagId}`, href: paths.tag_edit(tagId || "") },
  ],
  [BreadcrumbsTypes.EMPTY]: () => [HOME_BREADCRUMB],
}
