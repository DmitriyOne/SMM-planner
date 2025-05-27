import { ERole } from "@/06_shared/model/enum"

export type THeaderProps = {
  authorized: boolean | null
  username?: string
  role?: ERole
}
