import type { RequestEvent } from "./$types";

/** @type {import('./$types').PageLoad} */
export function load({ cookies }: RequestEvent) {
  const sid = cookies.get('sid');
  if (!sid)
    return;
  return {
    user: {
      username: 'username',
      email: 'email@email.com',
    }
  };
}
