import { ERole } from "../enum"

export const canManageRoles = (role: ERole) => role === ERole.admin
