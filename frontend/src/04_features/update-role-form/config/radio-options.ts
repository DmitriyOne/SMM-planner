import { ERole } from "@/06_shared/model/enum"

type TRadioOption = {
  value: ERole
  label: string
}

export const RADIO_OPTIONS: TRadioOption[] = [
  {
    value: ERole.reader,
    label: "Reader",
  },
  {
    value: ERole.editor,
    label: "Editor",
  },
  {
    value: ERole.admin,
    label: "Admin",
  },
  {
    value: ERole.super_admin,
    label: "Super admin",
  },
]
