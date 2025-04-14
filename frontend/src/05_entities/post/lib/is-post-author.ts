export const isPostAuthor = (
  postAuthorId: number | string,
  currentUserId: number | string,
) => {
  return String(postAuthorId) === String(currentUserId)
}
