export const PREFIX = {
  BASE_GLOBAL: 'api',
  VERSION: 'v1',
  POSTS: 'posts',
  SWAGGER: 'swagger',
  getGlobal() {
    return `${this.BASE_GLOBAL}/${this.VERSION}`
  },
}
