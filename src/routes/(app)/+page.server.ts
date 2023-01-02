import { findUserBySid } from "$lib/prisma/user";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }: RequestEvent) {
  const sid = cookies.get('sid');
  if (!sid)
    return;
  
  const session = await findUserBySid(sid);
  if (!session)
    return;

  return {
    user: session.user
  };
}
