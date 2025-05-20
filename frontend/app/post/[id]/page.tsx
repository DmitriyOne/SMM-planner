import { PostReadPage } from "@/02_pages/post-read"
import { getPosts } from "@/03_widgets/post-card-list/api"
import { getPost } from "@/05_entities/post/api"
import { HEAD_TITLE } from "@/06_shared/config/head"
import { isNumeric } from "@/06_shared/lib/other"
import { notFound } from "next/navigation"

type TParams = { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  const posts = await getPosts({})
  return posts.map((post) => ({ id: String(post.id) }))
}

export async function generateMetadata({ params }: TParams) {
  const { id } = await params
  if (!isNumeric(id)) return {}

  const post = await getPost(id)

  if (!post) return notFound()

  return {
    title: `${HEAD_TITLE.DEFAULT} | ${post.title}`,
  }
}

export default async function Page({ params }: TParams) {
  const { id } = await params
  if (!isNumeric(id)) return notFound()

  const post = await getPost(id)

  if (!post) return notFound()

  return <PostReadPage post={post} />
}
