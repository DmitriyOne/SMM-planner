import { PostReadPage } from "@/02_pages/post-read"
import { getPosts } from "@/03_widgets/post-card-list/api"
import { getPost } from "@/05_entities/post/api"

type TParams = { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  const posts = await getPosts({})

  return posts.map((post) => ({
    id: String(post.id),
  }))
}

export async function generateMetadata({ params }: TParams) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post.title,
  }
}

export default async function Page({ params }: TParams) {
  const { id } = await params
  const post = await getPost(id)

  return <PostReadPage post={post} />
}
