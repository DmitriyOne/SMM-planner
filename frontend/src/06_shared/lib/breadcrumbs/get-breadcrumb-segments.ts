import { TBreadcrumbSegment } from "@/05_entities/breadcrumb-item/model"
import { breadcrumbConfig } from "@/06_shared/config"
import { BreadcrumbsTypes } from "@/06_shared/config/enums/breadcrumb"
import { isValidArray } from "@/06_shared/model/utils"

export type TBreadcrumbParams = {
  postId?: string
  userId?: string
}

export const getBreadcrumbSegments = (
  type: BreadcrumbsTypes,
  params: TBreadcrumbParams = {},
): TBreadcrumbSegment[] => {
  const getBreadcrumb = breadcrumbConfig[type]

  if (!isValidArray(getBreadcrumb(params))) {
    return []
  }

  return getBreadcrumb(params)
}
