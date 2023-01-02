import { createSession } from '$lib/prisma/session';
import { findUserBySid, findUserByUsername } from '$lib/prisma/user';
import { comparePasswordHash, hashPassword } from '$lib/utils/auth';
import { isCreateUser } from '$lib/validation/user';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }: RequestEvent) {
  const sid = cookies.get('sid');
  if (!sid)
    return;
  const user = await findUserBySid(sid);
  if (!user)
    return;
  throw redirect(302, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
  register: async ({ request, cookies }: RequestEvent) => {
    const data = await request.formData();
    const email = data.get('email');
    const username = data.get('username');
    const password = data.get('password');
    const errors = isCreateUser({ email, username, password })
    if (errors)
      return fail(400, { message: 'Invalid request', email, username, errors });

    const hash = await hashPassword(password as string);
    const user = await findUserByUsername(username as string);
    if (!user || !user.password)
      return fail(401, { username, password });
  
    const isValid = await comparePasswordHash(user.password, hash);
    if (!isValid)
      return fail(401, { username, password })
    
    // TODO use jwt authentication
    const session = await createSession(user);
    cookies.set('sid', session.id);
    throw redirect(302, '/');
  },
};
