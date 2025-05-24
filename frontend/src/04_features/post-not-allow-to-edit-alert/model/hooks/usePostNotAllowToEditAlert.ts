import { POST_QUERY_PARAMS } from "@/06_shared/config/query-params"
import { message } from "antd"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { MESSAGE } from "../../config"

export const usePostNotAllowToEditAlert = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const notAllowToEdit = searchParams.get(POST_QUERY_PARAMS.not_allow_to_edit)
    if (notAllowToEdit) {
      router.replace(pathname)
      message.error(MESSAGE.CANNOT_EDIT_POST, 5)
    }
  }, [router, pathname, searchParams])
}
