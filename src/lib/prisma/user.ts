import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });
  return user;
}

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      posts: true
    }
  });
  return user;
}

export const findUserBySid = async (sid: string) => {
  const session = await prisma.session.findUnique({
    where: { id: sid },
    include: {
      user: {
        select: {
          bio: true,
          email: true,
          username: true,
          posts: true,
        }
      }
    },
  });
  return session;
}

export async function createUser(email: string, password: string, username: string) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      oidcOrigin: 'local',
      verified: false,
    },
  })
  return user;
}
