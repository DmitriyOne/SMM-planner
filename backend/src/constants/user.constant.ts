export const USER_NOT_FOUND_BY_ID_MSG = (id: string) => `User not found with this id: ${id}`
export const USER_DELETED_SUCCESS_MSG = (id: string) => `User (#${id}) was deleted`
export const USER_UPDATED_SUCCESS_MSG = (id: string) => `User (${id}) was updated`
export const USER_UPDATE_ROLE_SUCCESS_MSG = (name: string, role: string) =>
  `The user (${name}) was updated role to ${role}`
export const USER_HAS_THIS_ROLE_MSG = (name: string, role: string) => `The user (${name}) already has this role ${role}`
