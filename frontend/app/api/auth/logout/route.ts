import { deleteAccessTokenFromCookie } from "@/06_shared/lib/auth"

export async function POST() {
  await deleteAccessTokenFromCookie()
  return new Response(null, { status: 204 })
}
