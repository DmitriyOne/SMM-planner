import { TagEditPage } from "@/02_pages/tag-edit"
import { isUserAllowToEditPost } from "@/05_entities/post/lib"
import { getTagById } from "@/05_entities/tags/api"
import { getAuthorizedUserByToken } from "@/05_entities/user/lib"
import { HEAD_TITLE } from "@/06_shared/config/head"
import { paths } from "@/06_shared/config/routing"
import { redirect } from "next/navigation"

type TParams = { params: Promise<{ id: string }> }

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.TAG_UPDATE}`,
  }
}

export default async function TagEdit({ params }: TParams) {
  const { id } = await params
  const tag = await getTagById(id)
  const user = await getAuthorizedUserByToken()

  if (!isUserAllowToEditPost(user?.role, user?.id, tag.authorId))
    return redirect(paths.tag_edit_not_allow(id))

  return <TagEditPage tag={tag} />
}
