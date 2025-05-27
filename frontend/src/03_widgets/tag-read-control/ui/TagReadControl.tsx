import { FC } from "react"
import { LinkEdit } from "@/06_shared/ui/link-edit/ui"
import { paths } from "@/06_shared/config/routing"
import classNames from "classnames"

import { isAuthor } from "@/05_entities/post/lib"

import { getAuthorizedUserByToken } from "@/05_entities/user/lib"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { DeleteTag } from "@/04_features/delete-tag/ui"

import styles from "./tag-read-control.module.scss"

type TProps = {
  tag: TTag
  className?: string
}

export const TagReadControl: FC<TProps> = async ({ tag, className }) => {
  const user = await getAuthorizedUserByToken()
  const author = isAuthor(tag.authorId, user?.id)

  const canSeeControls =
    author || user?.role === "admin" || user?.role === "super_admin"

  if (!canSeeControls) {
    return <></>
  }

  const tagIdString = String(tag.id)

  const componentClassName = classNames(styles.component, className)

  return (
    <div className={componentClassName}>
      <DeleteTag
        className={styles.delete}
        tagId={tagIdString}
      />
      <LinkEdit redirectPath={paths.tag_edit(tagIdString)} />
    </div>
  )
}
