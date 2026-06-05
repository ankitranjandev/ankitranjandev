import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { sortByDate, filterDrafts } from '@/lib/utils';

const SITE = 'https://ankitranjan.dev';

// Strip SVG blocks and HTML tags, decode a few common entities, and collapse
// whitespace so deep-dive topic summaries read as plain prose.
function stripHtml(input: string): string {
  return input
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li|h[1-6]|pre|div)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function GET(_context: APIContext) {
  const deepDives = (await getCollection('deepDives')).sort(
    (a, b) => a.data.order - b.data.order
  );
  const posts = sortByDate(filterDrafts(await getCollection('posts')));
  const notes = sortByDate(await getCollection('notes'));

  const lines: string[] = [];

  lines.push('# ankitranjan.dev — Full Content');
  lines.push('');
  lines.push(
    '> Full text of the Dart deep-dive series, blog posts, and notes by Ankit Ranjan, Senior Mobile Engineer.'
  );
  lines.push('');

  lines.push('# Deep Dives');
  lines.push('');
  for (const d of deepDives) {
    lines.push(`## ${d.data.title}`);
    lines.push(`URL: ${SITE}/deep-dives/${d.id}/`);
    lines.push('');
    lines.push(d.data.description);
    lines.push('');
    for (const topic of d.data.topics) {
      lines.push(`### ${topic.title}`);
      const text = stripHtml(topic.summary);
      if (text) lines.push(text);
      lines.push('');
    }
  }

  lines.push('# Blog');
  lines.push('');
  for (const p of posts) {
    lines.push(`## ${p.data.title}`);
    lines.push(`URL: ${SITE}/blog/${p.id}/`);
    lines.push('');
    if (p.data.description) {
      lines.push(p.data.description);
      lines.push('');
    }
    if (p.body) {
      lines.push(p.body.trim());
      lines.push('');
    }
  }

  lines.push('# Notes');
  lines.push('');
  for (const n of notes) {
    lines.push(`## ${n.data.title}`);
    lines.push(`URL: ${SITE}/notes/${n.id}/`);
    lines.push('');
    if (n.body) {
      lines.push(n.body.trim());
      lines.push('');
    }
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
