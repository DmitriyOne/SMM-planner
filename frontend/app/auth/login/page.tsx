import { LoginPage } from "@/02_pages/login"

export async function generateMetadata() {
  return {
    title: "Login",
  }
}

export default async function Page() {
  return <LoginPage />
}
