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
    }
  });
  return user;
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
