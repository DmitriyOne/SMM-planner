export const PREFIX = {
  BASE_GLOBAL: 'api',
  VERSION: 'v1',
  POSTS: 'posts',
  ID: ':id',
  CREATE: 'create',
  SWAGGER: 'swagger',
  USERS: 'users',
  getGlobal() {
    return `${this.BASE_GLOBAL}/${this.VERSION}`
  },
}
