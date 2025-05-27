export const EIconType = {
  ADD: "add",
  DELETE: "delete",
} as const

export type EIconType = (typeof EIconType)[keyof typeof EIconType]
