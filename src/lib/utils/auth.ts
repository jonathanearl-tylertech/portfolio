import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

export const comparePasswordHash = async (password: string, hash: string) =>  bcrypt.compare(password, hash);
