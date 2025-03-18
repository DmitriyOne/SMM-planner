import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello frontend!

      <br />
      <br />
      <br />

      <div>
        <Link href="/posts">
          Go to Posts
        </Link>
      </div>
      
      <br />

      <div>
        <Link href="/posts/1">
          Go to Post #1
        </Link>
      </div>

    </div>
  );
}
