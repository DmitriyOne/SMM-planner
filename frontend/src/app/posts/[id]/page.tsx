'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

async function getPost() {
  const res = await fetch('https://smm-planner.onrender.com/api/v1/posts/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json()
}


export default function Page() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPost().then((post) => {
      setPost(post)
    }).catch((error) => {
      setError(error)
    })
  }, [])


  return (
    <div>
      Post #1

      <div>
        <Link href={"/"}>
          Go to home
        </Link>
      </div>

      {!post && !error
        ? <div>Loading...</div>
        : <pre>{JSON.stringify(post, null, 2)}</pre>
      }
      
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
}