export const PREFIX = {
  BASE_GLOBAL: 'api',
  VERSION: 'v1',
  POSTS: 'posts',
  getGlobal() {
    return `${this.BASE_GLOBAL}/${this.VERSION}`;
  },
};
