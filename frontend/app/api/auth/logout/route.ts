import { deleteAccessTokenFromCookie } from "@/06_shared/lib/auth"

export async function GET() {
  await deleteAccessTokenFromCookie()
  return Response.json({ success: true })
}
