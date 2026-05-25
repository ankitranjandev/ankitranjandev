import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortByDate, filterDrafts } from '@/lib/utils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const sortedPosts = sortByDate(filterDrafts(posts));

  return rss({
    title: 'ankitranjan.dev',
    description: 'Personal blog of Ankit Ranjan, a Flutter developer writing about mobile app development, Flutter internals, and frontier mobile-dev topics.',
    site: context.site ?? 'https://ankitranjan.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
