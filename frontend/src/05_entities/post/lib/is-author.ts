export const isAuthor = (
  authorId: number | string,
  currentUserId: string | null | undefined,
) => {
  if (!currentUserId) return false
  return String(authorId) === String(currentUserId)
}
