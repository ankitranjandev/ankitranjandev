# ankitranjan.dev

Personal blog of Ankit Ranjan, built with Astro 5, Tailwind CSS v4, and deployed to Cloudflare Pages.

## Tech Stack

- **Framework**: Astro 5 with MDX and Content Collections
- **Styling**: Tailwind CSS v4 with `@tailwindcss/typography`
- **Code Blocks**: Expressive Code (github-light/github-dark themes)
- **Search**: Pagefind (build-time indexer)
- **Comments**: Giscus (optional, via env vars)
- **OG Images**: Generated at build time with Satori + resvg
- **Fonts**: Newsreader (body) + JetBrains Mono (code), self-hosted via Fontsource
- **Deploy**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Opens at `http://localhost:4321`

### Build

```bash
pnpm build
```

Outputs to `./dist`. Includes Pagefind indexing.

### Preview Production Build

```bash
pnpm preview
```

### Lighthouse Audit

```bash
pnpm lighthouse
```

Runs Lighthouse CI against the built site.

## Writing Content

### Creating a New Post

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: "Your Post Title"
description: "A brief description for SEO and social sharing."
publishedAt: 2024-04-15
tags:
  - flutter
  - dart
draft: false
heroVideo: "youtube-shorts-id"  # Optional: YouTube Shorts ID
ogImage: "/custom-og.png"       # Optional: Override auto-generated OG image
---

Your content here. Supports all MDX features.
```

### Creating a New Note

Create a new `.mdx` file in `src/content/notes/`:

```mdx
---
title: "Your Note Title"
publishedAt: 2024-04-15
tags:
  - flutter
---

Short-form content here.
```

### Available MDX Components

Import and use these in your posts:

```mdx
import Callout from '@/components/Callout.astro';
import DartPad from '@/components/DartPad.astro';
import LiteYouTube from '@/components/LiteYouTube.astro';

<Callout type="tip" title="Pro Tip">
  This is a tip callout. Types: note, warning, tip.
</Callout>

<DartPad id="gist-id" mode="flutter" />

<LiteYouTube id="video-id" title="Video Title" />
```

### Frontmatter Schema

**Posts** (`src/content/posts/`):

| Field         | Type       | Required | Description                          |
|---------------|------------|----------|--------------------------------------|
| `title`       | string     | Yes      | Post title                           |
| `description` | string     | Yes      | SEO description                      |
| `publishedAt` | Date       | Yes      | Publication date                     |
| `updatedAt`   | Date       | No       | Last update date                     |
| `tags`        | string[]   | Yes      | Array of tags                        |
| `draft`       | boolean    | No       | Default: false                       |
| `heroVideo`   | string     | No       | YouTube Shorts ID for top of post    |
| `ogImage`     | string     | No       | Custom OG image path                 |

**Notes** (`src/content/notes/`):

| Field         | Type       | Required | Description                          |
|---------------|------------|----------|--------------------------------------|
| `title`       | string     | Yes      | Note title                           |
| `publishedAt` | Date       | Yes      | Publication date                     |
| `tags`        | string[]   | Yes      | Array of tags                        |

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Giscus Comments (Optional)

To enable Giscus comments:

1. Go to [giscus.app](https://giscus.app)
2. Configure your repository
3. Copy the values to your `.env`:

```
PUBLIC_GISCUS_REPO=your-username/your-repo
PUBLIC_GISCUS_REPO_ID=R_xxxxx
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

Comments will automatically appear on post pages when configured.

## Deployment

### Cloudflare Pages

The project is configured for Cloudflare Pages deployment.

**Option 1: Wrangler CLI**

```bash
pnpm build
npx wrangler pages deploy ./dist
```

**Option 2: Git Integration**

1. Push to GitHub
2. Connect repository in Cloudflare Pages dashboard
3. Set build command: `pnpm build`
4. Set output directory: `dist`
5. Add environment variables if using Giscus

### Build Output

- Static HTML/CSS/JS in `./dist`
- Pagefind search index in `./dist/pagefind`
- OG images in `./dist/og/*.png`
- Sitemap at `./dist/sitemap-index.xml`
- RSS feed at `./dist/rss.xml`

## Project Structure

```
├── public/
│   ├── _headers          # Cloudflare cache/security headers
│   ├── images/           # Favicon and static images
│   └── fonts/            # Self-hosted fonts (copied at build)
├── src/
│   ├── components/       # Astro components
│   ├── content/
│   │   ├── posts/        # Blog posts (MDX)
│   │   └── notes/        # Short notes (MDX)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/              # Utilities
│   ├── pages/            # Routes
│   └── styles/
│       └── global.css    # Tailwind + custom styles
├── astro.config.mjs
├── content.config.ts     # Content collections schema
├── lighthouserc.js       # Lighthouse CI config
├── package.json
├── tsconfig.json
└── wrangler.toml         # Cloudflare Pages config
```

## Features

- **Responsive**: 320px to 2560px, mobile-first
- **Dark Mode**: System preference + manual toggle with persistence
- **Search**: Cmd/Ctrl+K opens Pagefind search dialog
- **SEO**: JSON-LD, Open Graph, Twitter cards, sitemap, RSS
- **Performance**: No JS on index pages, lazy-loaded embeds
- **Accessibility**: Skip links, semantic HTML, ARIA labels, focus states

## License

MIT
