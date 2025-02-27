export const PREFIX = {
  BASE_GLOBAL: 'api',
  VERSION: 'v1',
  POSTS: 'posts',
  ALL: 'all',
  ID: ':id',
  CREATE: 'create',
  SWAGGER: 'swagger',
  USERS: 'users',
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  UPDATE_ROLE: ':id/role',
  TAGS: 'tags',
  getGlobal() {
    return `${this.BASE_GLOBAL}/${this.VERSION}`
  },
}
