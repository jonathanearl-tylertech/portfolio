import { findUserBySid } from "$lib/prisma/user";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
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
