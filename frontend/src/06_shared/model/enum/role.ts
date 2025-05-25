export const ERole = {
  super_admin: "super_admin",
  admin: "admin",
  reader: "reader",
  editor: "editor",
} as const

export type ERole = (typeof ERole)[keyof typeof ERole]
