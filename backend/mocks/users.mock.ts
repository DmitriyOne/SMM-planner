import { User } from '@prisma/client'

export const usersMock: Partial<User>[] = [
  {
    email: 'user1@gmail.com',
    password: '123456',
    name: 'User 1',
    role: 'admin',
  },
  {
    email: 'user2@gmail.com',
    password: '123456',
    name: 'User 2',
    role: 'reader',
  },
]
