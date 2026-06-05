import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { sortByDate, filterDrafts } from '@/lib/utils';

const SITE = 'https://ankitranjan.dev';

export async function GET(_context: APIContext) {
  const deepDives = (await getCollection('deepDives')).sort(
    (a, b) => a.data.order - b.data.order
  );
  const posts = sortByDate(filterDrafts(await getCollection('posts')));
  const notes = sortByDate(await getCollection('notes'));

  const lines: string[] = [];

  lines.push('# ankitranjan.dev');
  lines.push('');
  lines.push('> Senior Mobile Engineer portfolio and technical blog');
  lines.push('');
  lines.push(
    'Ankit Ranjan is a Senior Mobile Engineer with 7+ years of experience building apps across Android, iOS, and Flutter. This site contains technical deep-dives, blog posts, and notes. The flagship content is a from-first-principles Dart programming series building toward Flutter development.'
  );
  lines.push('');

  lines.push('## Deep Dives (Dart Programming Series)');
  for (const d of deepDives) {
    lines.push(
      `- [${d.data.title}](${SITE}/deep-dives/${d.id}/): ${d.data.description}`
    );
  }
  lines.push('');

  lines.push('## Blog');
  for (const p of posts) {
    lines.push(`- [${p.data.title}](${SITE}/blog/${p.id}/): ${p.data.description}`);
  }
  lines.push('');

  lines.push('## Notes');
  for (const n of notes) {
    lines.push(`- [${n.data.title}](${SITE}/notes/${n.id}/)`);
  }
  lines.push('');

  lines.push('## Contact');
  lines.push('- Email: ankitranjan.dev@gmail.com');
  lines.push('- GitHub: https://github.com/ankitranjandev');
  lines.push('- X/Twitter: https://x.com/CubeRootX');
  lines.push('- LinkedIn: https://www.linkedin.com/in/ankit-ranjan-a874b6101');
  lines.push('- Substack: https://substack.com/@ankitranjandev');
  lines.push('');

  lines.push('## Optional');
  lines.push(`- [Full text of all content](${SITE}/llms-full.txt)`);
  lines.push(`- [RSS Feed](${SITE}/rss.xml)`);
  lines.push(`- [Sitemap](${SITE}/sitemap-index.xml)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
