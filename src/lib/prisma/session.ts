import { PrismaClient, type User } from '@prisma/client'
import crypto from 'node:crypto';

const prisma = new PrismaClient()

export const createSession = (user: User) => {
  const sid = crypto.randomBytes(32).toString('hex');
  const session = prisma.session.create({
    data: {
      id: sid,
      userId: user.id
    }
  });
  return session;
}
