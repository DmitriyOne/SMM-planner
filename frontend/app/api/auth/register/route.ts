import { register } from "@/06_shared/api/auth"
import { TRegisterBody } from "@/06_shared/api/types"
import { setAccessTokenCookie } from "@/06_shared/lib/auth"

export async function POST(request: Request) {
  const body = (await request.json()) as TRegisterBody

  try {
    const { accessToken } = await register(body)
    setAccessTokenCookie(accessToken)
    return new Response(null, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
