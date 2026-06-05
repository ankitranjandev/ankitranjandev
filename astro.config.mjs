import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';

const SITE = 'https://ankitranjan.dev';

// Read frontmatter dates from content collections so the sitemap can emit an
// accurate <lastmod> per page. Maps each content file to its public URL.
function buildLastmodMap() {
  const map = new Map();
  const sources = [
    { dir: 'src/content/deep-dives', prefix: '/deep-dives/' },
    { dir: 'src/content/posts', prefix: '/blog/' },
    { dir: 'src/content/notes', prefix: '/notes/' },
  ];

  for (const { dir, prefix } of sources) {
    let entries;
    try {
      entries = readdirSync(fileURLToPath(new URL(dir, import.meta.url)));
    } catch {
      continue;
    }

    for (const file of entries) {
      if (!file.endsWith('.mdx')) continue;
      const slug = file.replace(/\.mdx$/, '');
      const raw = readFileSync(
        fileURLToPath(new URL(`${dir}/${file}`, import.meta.url)),
        'utf-8'
      );
      const fm = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!fm) continue;

      const updated = fm[1].match(/^updatedAt:\s*(.+)$/m);
      const published = fm[1].match(/^publishedAt:\s*(.+)$/m);
      const dateStr = (updated?.[1] ?? published?.[1] ?? '')
        .trim()
        .replace(/['"]/g, '');
      if (!dateStr) continue;

      const date = new Date(dateStr);
      if (Number.isNaN(date.getTime())) continue;

      map.set(`${SITE}${prefix}${slug}/`, date.toISOString());
    }
  }

  return map;
}

const lastmodMap = buildLastmodMap();

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => {
        return theme.name === 'github-dark' ? '.dark' : ':root:not(.dark)';
      },
      styleOverrides: {
        frames: {
          frameBoxShadowCssValue: 'none',
        },
        borderRadius: '0.375rem',
      },
      defaultProps: {
        showLineNumbers: false,
        wrap: false,
      },
    }),
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodMap.get(item.url);
        if (lastmod) item.lastmod = lastmod;

        if (item.url === `${SITE}/`) {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (item.url.includes('/deep-dives/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (
          item.url.includes('/blog/') ||
          item.url.includes('/notes/')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        } else {
          item.changefreq = 'yearly';
          item.priority = 0.5;
        }

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
