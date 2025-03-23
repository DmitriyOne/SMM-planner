'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// TODO: сделать компонент активной ссылке и там наисать "use client", а тут убрать
// TODO: ссылки не должны быть актвными если эта текущая страница - это должен быть span

export function Header() {
  const pathname = usePathname()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser: any = null;

  return (
    <nav style={{ padding: "20px 20px 0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={"/"}>
          Logo
        </Link>
        <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
          <li>
            <Link
              href="/posts"
            >
              All posts
            </Link>
          </li>
          {currentUser == null ? (
            <>
              <li>
                <Link
                  className={`nav-link ${pathname == "/login" ? "active" : ""}`}
                  href="/login"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${pathname == "/register" ? "active" : ""}`}
                  href="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}
                  href={`/profile`}
                >
                  {currentUser.image && (
                    <Image
                      width={25}
                      height={25}
                      src={currentUser.image}
                      alt="avatar"
                    />
                  )}
                  {currentUser.username}
                </Link>
              </li>
              <li>
                <button>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}