'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getPost(id: string) {
  const res = await fetch(`https://smm-planner.onrender.com/api/v1/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json()
}


export default function Page() {
  const params = useParams<{ id: string }>()
  
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPost(params.id).then((post) => {
      setPost(post)
    }).catch((error) => {
      setError(error)
    })
  }, [params])


  return (
    <div>
      <h1 style={{ marginBottom: "20px", fontSize: "22px" }}> 
        Post #{params.id}
      </h1>

      {!post && !error
        ? <div>Loading...</div>
        : <pre>{JSON.stringify(post, null, 2)}</pre>
      }
      
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
}
