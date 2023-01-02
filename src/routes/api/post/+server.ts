import type { RequestEvent } from './$types';


// create a post
/** @type {import('./$types').RequestsHandler} */
export async function POST({ request }: RequestEvent) {
  const data = await request.json();
  // validate post params
  // create post
  // return post or postId
}


// get post by route postId
/** @type {import('./$types').RequestsHandler} */
export async function GET({ request }: { request: Request }) {
  // get post
  // return post
}
