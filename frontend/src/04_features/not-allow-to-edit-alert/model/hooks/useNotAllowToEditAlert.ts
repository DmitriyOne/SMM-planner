import { QUERY_PARAM_EDIT } from "@/06_shared/config/query-params"
import { message } from "antd"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { MESSAGE } from "../../config"

export const useNotAllowToEditAlert = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const notAllowToEdit = searchParams.get(QUERY_PARAM_EDIT.not_allow)
    if (notAllowToEdit) {
      router.replace(pathname)
      message.error(MESSAGE.CANNOT_EDIT, 5)
    }
  }, [router, pathname, searchParams])
}
