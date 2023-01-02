import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }: RequestEvent) {
  cookies.delete('sid');
  throw redirect(302, '/login');
};
