import { toUpperCaseString } from '../utils/string.utils'

export const POST_NOT_FOUND_BY_ID_MSG = (id: number) => `Post not found with this id: ${id}`
export const POST_DELETED_SUCCESS_MSG = (id: number) => `Post #${id} was deleted`
export const POST_UPDATE_SUCCESS_MSG = (id: number) => `Post #${id} was updated`
export const POST_ALREADY_EXISTS_MSG = (title: string) => `Post already has this title - ${toUpperCaseString(title)}`
