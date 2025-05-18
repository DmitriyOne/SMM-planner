export const COOKIES = {
  AUTH: {
    name: "accessToken",
    options: {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      httpOnly: true,
    },
  },
}
