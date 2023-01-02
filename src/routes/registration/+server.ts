import { createSession } from '$lib/prisma/session';
import { createUser, findUserByUsername } from '$lib/prisma/user';
import { isCreateUser, isUsername } from '$lib/validation/registration';
import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/** @type {import('./$types').RequestsHandler} */
export async function GET({ request }: { request: Request }) {
  const sp = new URLSearchParams(request.url.split('?')[1]);
  const username = sp.get('username');
  let err = isUsername(username as string);
  if (err)
    throw error(400, { message: err.toString() });

  const user = await findUserByUsername(username as string);
  if (user)
    throw error(404, 'User already exists');

  return json({ message: 'Username is available.' });
}

/** @type {import('./$types').RequestsHandler} */
export async function POST({ request, cookies }: RequestEvent) {
  const data = await request.json();
  const errors = isCreateUser(data)
  if (errors)
    throw error(400, { message: `Invalid request. ${errors.toString()}`})

  const user = await createUser(data.email, data.password, data.username);
  const session = await createSession(user);
  cookies.set('sid', session.id);
  return json(null);
}
