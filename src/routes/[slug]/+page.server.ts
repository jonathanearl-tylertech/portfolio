import { error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/utils/markdown';
import type { PageServerLoad } from './$types';

const findProject = async (slug: string) => {
  try {
    const markdown = await import(`${process.cwd()}/src/lib/markdown/${slug}.md?raw`);
    return renderMarkdown(markdown.default);
  } catch (err) {
    if ((err as any).code === 'ENOENT')
      return null;

    console.error('unhandled error', err);
  }
}

export const load: PageServerLoad = async ({ params }) => {
  const content = await findProject(params.slug);
  if (!content)
    throw error(404, 'Not found');

  return {
    title: params.slug,
    content
  };
}
