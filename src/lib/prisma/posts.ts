import { PrismaClient, type Post, type User } from '@prisma/client'

const prisma = new PrismaClient()

export const createPost = (post: Post, author: User) => {
  const createdPost = prisma.post.create({
    data : {
      ...post,
      authorId: author.id
    }
  });
  return createdPost;
}
