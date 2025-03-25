import Link from "next/link"

type TTag = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  authorId: string
  posts: TPost[]
}

type TPost = {
  id: number
  title: string
  description: string
  image: string
  isPublish: boolean
  isApproved: boolean
  createdAt: string
  updatedAt: string
  authorId: string
  tags: TTag[]
}

async function getPosts(): Promise<TPost[]> {
  const res = await fetch("https://smm-planner.onrender.com/api/v1/posts/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return res.json()
}

export default async function Page() {
  const posts = await getPosts()

  return (
    <div>
      <h1 style={{ marginBottom: "20px", fontSize: "22px" }}>All posts</h1>

      <ul style={{ listStyle: "none" }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ marginBottom: "20px" }}
          >
            <span>{post.id}</span>
            <Link
              href={`/posts/${post.id}`}
              style={{ textDecoration: "underline" }}
            >
              {post.title}
            </Link>
            <p>{post.description}</p>
            <div>Created - {new Date(post.createdAt).toDateString()}</div>
            <div>Updated - {new Date(post.updatedAt).toDateString()}</div>
            <div>{post.isPublish ? "Published" : "Not published"}</div>
            <div>{post.isApproved ? "Approved" : "Not approved"}</div>
            <div>
              Tags:
              {post.tags?.map((tag) => tag.title).join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
