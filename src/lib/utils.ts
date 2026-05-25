import type { CollectionEntry } from 'astro:content';

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getReadingTimeFromBody(body: string): string {
  const minutes = calculateReadingTime(body);
  return `${minutes} min read`;
}

export function sortByDate<T extends { data: { publishedAt: Date } }>(
  items: T[]
): T[] {
  return items.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export function filterDrafts<T extends { data: { draft?: boolean } }>(
  items: T[]
): T[] {
  return import.meta.env.PROD
    ? items.filter((item) => !item.data.draft)
    : items;
}

export function getUniqueTags(
  posts: CollectionEntry<'posts'>[],
  notes: CollectionEntry<'notes'>[]
): Map<string, number> {
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  for (const note of notes) {
    for (const tag of note.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return new Map([...tagCounts.entries()].sort((a, b) => b[1] - a[1]));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
