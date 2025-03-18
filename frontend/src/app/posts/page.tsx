import Link from "next/link";

 
 async function getPosts() {
  const res = await fetch('https://smm-planner.onrender.com/api/v1/posts/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json()
}

export default async function Page() {
  const posts = await getPosts()
 
  return (
    <div>
      All posts

      <br />

      <div>
        <Link href={"/"}>
          Go to home
        </Link>
      </div>

      <br />

      <ul>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </ul>
    </div>
  )
}