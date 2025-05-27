import { Feed } from "@/02_pages/feed"
import { getPosts } from "@/05_entities/post/api"

export default async function Home() {
  const posts = await getPosts({})

  return <Feed posts={posts} />
}
