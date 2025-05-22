export const ERole = {
  admin: "admin",
  reader: "reader",
  editor: "editor",
} as const

export type ERole = (typeof ERole)[keyof typeof ERole]
