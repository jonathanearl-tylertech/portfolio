import { createSession } from '$lib/prisma/session';
import { findUserByUsername } from '$lib/prisma/user';
import { comparePasswordHash, hashPassword } from '$lib/utils/auth';
import { isCreateUser,  } from '$lib/validation/registration';
import { json, error, fail } from '@sveltejs/kit';
import type { RequestEvent } from '../(app)/$types';

/** @type {import('./$types').RequestsHandler} */
export async function POST({ request, cookies }: RequestEvent) {
  const data = await request.json();
  const errors = isCreateUser(data)
  if (errors)
    throw error(400, { message: `Invalid request. ${errors.toString()}`})

  const hash = await hashPassword(data.password);
  const user = await findUserByUsername(data.username);
  if (!user || !user.password)
    return fail(401);

  const isValid = await comparePasswordHash(user.password, hash);
  if (!isValid)
    return fail(401)

  const session = await createSession(user);
  cookies.set('sid', session.id);
  return json({ 
    user: {
      email: user.email,
      bio: user.bio,
      username: user.username,
      posts: user.posts
    }
  });
}
