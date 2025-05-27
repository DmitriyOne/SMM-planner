import { PostEditPage } from "@/02_pages/post-edit"
import { getPost } from "@/05_entities/post/api"
import { isUserAllowToEditPost } from "@/05_entities/post/lib"
import { getAuthorizedUserByToken } from "@/05_entities/user/lib"
import { HEAD_TITLE } from "@/06_shared/config/head"
import { paths } from "@/06_shared/config/routing"
import { redirect } from "next/navigation"

type TParams = { params: Promise<{ id: string }> }

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.POST_UPDATE}`,
  }
}

export default async function Page({ params }: TParams) {
  const { id } = await params
  const post = await getPost(id)
  const user = await getAuthorizedUserByToken()

  if (!isUserAllowToEditPost(user?.role, user?.id, post.authorId))
    return redirect(paths.post_edit_not_allow(id))

  return <PostEditPage post={post} />
}
