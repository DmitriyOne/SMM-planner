import { ERole } from "@/06_shared/model/enum"
import { ComponentType } from "react"

export type IMenuItem = {
  title: string
  href: string
  show: boolean
  role?: ERole
  icon?: ComponentType<any>
}
