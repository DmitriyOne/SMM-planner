import { ERole } from "../enum"

export const canCreateContent = (role: ERole) => role !== ERole.reader
