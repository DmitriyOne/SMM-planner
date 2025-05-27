import { getAccessTokenFromCookies } from "@/06_shared/lib/auth"

export async function GET() {
  const token = await getAccessTokenFromCookies()
  return Response.json({ token })
}
