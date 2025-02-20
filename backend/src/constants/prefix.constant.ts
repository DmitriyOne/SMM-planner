export const PREFIX = {
  BASE_GLOBAL: 'api',
  VERSION: 'v1',
  POSTS: 'posts',
  ID: ':id',
  SWAGGER: 'swagger',
  getGlobal() {
    return `${this.BASE_GLOBAL}/${this.VERSION}`
  },
}
