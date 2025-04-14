import { TBreadcrumbSegment } from "@/05_entities/breadcrumb-item/model"
import { paths } from "./routing"
import { TBreadcrumbParams } from "../lib/breadcrumbs"
import { BreadcrumbsTypes } from "./enums/breadcrumb"

const HOME_BREADCRUMB: TBreadcrumbSegment = {
  label: "Home",
  href: paths.home,
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
  [BreadcrumbsTypes.EMPTY]: () => [HOME_BREADCRUMB],
}
