import { Comment } from '@prisma/client'

export const commentsMock: Partial<Comment>[] = [
  {
    id: 1,
    content: 'Its a nice post!',
  },
  {
    id: 2,
    content: 'Thanks for sharing!',
  },
  {
    id: 3,
    content: 'Wow! That is so cool.',
  },
]
