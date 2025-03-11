import { ERole } from '@prisma/client'
import { METHOD_PUBLIC } from './method.constant'
import { PREFIX } from './prefix.constant'

const BASE = `/${PREFIX.BASE_GLOBAL}/${PREFIX.VERSION}`

export const ENDPOINT = {
  BASE,
  POSTS: `${BASE}/${PREFIX.POSTS}/${PREFIX.ALL}`,
  CREATE_POST: `${BASE}/${PREFIX.POSTS}/${PREFIX.CREATE}`,
  POST_BY_ID: `${BASE}/${PREFIX.POSTS}/{id}`,
  USERS: `${BASE}/${PREFIX.USERS}/${PREFIX.ALL}`,
  CREATE_USER: `${BASE}/${PREFIX.USERS}/${PREFIX.CREATE}`,
  USER_BY_ID: `${BASE}/${PREFIX.USERS}/{id}`,
  LOGIN: `${BASE}/${PREFIX.AUTH}/${PREFIX.LOGIN}`,
}

export const ENDPOINT_PUBLIC = {
  LOGIN: {
    path: ENDPOINT.LOGIN,
    method: METHOD_PUBLIC.POST,
  },
  POSTS: {
    path: ENDPOINT.POSTS,
    method: METHOD_PUBLIC.POST,
  },
  POST: {
    path: ENDPOINT.POST_BY_ID,
    method: METHOD_PUBLIC.GET,
  },
}

export const WHO_CAN_ACCESS_THIS_ENDPOINT = (...roles: [ERole, ...ERole[]]) => `- can use only: ${roles.join(', ')}`

export const PRIVATE_ENDPOINT_WITH_BASIC_AUTH = '- with basic auth (only prod)'
