export const isPostAuthor = (
  postAuthorId: number | string,
  currentUserId: string | null | undefined,
) => {
  if (!currentUserId) return false
  return String(postAuthorId) === String(currentUserId)
}
