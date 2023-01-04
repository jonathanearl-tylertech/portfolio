import { createSession } from '$lib/prisma/session';
import { findUserBySid, findUserByUsername } from '$lib/prisma/user';
import { comparePasswordHash, hashPassword } from '$lib/utils/auth';
import { isRegistration } from '$lib/validation/registration';
import { fail, redirect } from '@sveltejs/kit';

import type { Action, Actions, PageServerLoad, RequestEvent } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const sid = cookies.get('sid');
  if (!sid)
    return;
  const user = await findUserBySid(sid);
  if (!user)
    return;
  throw redirect(302, '/');
}

const register: Action = async ({ request, cookies }: RequestEvent) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');
  const errors = isRegistration({
    email: email as string, 
    username: username as string, 
    password: password as string
  })
  console.log(errors);
  if (errors) {
    return fail(400, {
      email,
      username,
      password,
      errors,
    });
  }

  const hash = await hashPassword(password as string);
  const user = await findUserByUsername(username as string);
  if (!user || !user.password)
    return fail(401, { email, username });

  const isValid = await comparePasswordHash(user.password, hash);
  if (!isValid)
    return fail(401, { email, username })

  // TODO use jwt authentication
  const session = await createSession(user);
  cookies.set('sid', session.id);
  throw redirect(302, '/');
}

export const actions: Actions = { register };
