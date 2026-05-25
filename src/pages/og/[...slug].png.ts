import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '@/lib/og-image';
import { formatDate, filterDrafts } from '@/lib/utils';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return filterDrafts(posts).map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({ props }: APIContext) {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<'posts'>>>[number] };
  const date = formatDate(post.data.publishedAt);
  const png = await generateOgImage(post.data.title, date);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
