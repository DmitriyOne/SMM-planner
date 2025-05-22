import { useUserContext } from "@/05_entities/user/model/context"

export const useLogout = () => {
  const { isLoading } = useUserContext()

  return {
    isLoading,
  }
}
