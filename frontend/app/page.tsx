import { Feed } from "@/02_pages/feed"
import { getPosts } from "@/03_widgets/post-card-list/api"

export default async function Home() {
  const posts = await getPosts({})

  return <Feed posts={posts} />
}
