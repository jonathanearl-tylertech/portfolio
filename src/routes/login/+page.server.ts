import { createSession } from '$lib/prisma/session';
import { findUserBySid, findUserByUsername } from '$lib/prisma/user';
import { comparePasswordHash, hashPassword } from '$lib/utils/auth';
import { isLogin, type ILoginError, type ILoginForm } from '$lib/validation/login';
import { error, fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
  const sid = cookies.get('sid');
  if (!sid)
    return;
  const user = await findUserBySid(sid);
  if (!user)
    return;
  throw redirect(302, '/');
}

const login: Action = async ({ request, cookies }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');
  const errors = isLogin({
    username: username as string,
    password: password as string,
  })
  if (errors)
    return fail(400, { username, errors })
  const hash = await hashPassword(password as string);
  const user = await findUserByUsername(username as string);
  if (!user || !user.password)
    return fail(401, { username, errors: { password: ['Username or Password is incorrect.'] as ILoginError } });

  const isValid = await comparePasswordHash(user.password, hash);
  if (!isValid)
    return fail(401, { username, errors: { password: ['Username or Password is incorrect.'] as ILoginError } })

  // TODO use jwt authentication?
  const session = await createSession(user);
  cookies.set('sid', session.id);
  throw redirect(302, '/');
};

export const actions: Actions = { login };
