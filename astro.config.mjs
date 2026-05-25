import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://ankitranjan.dev',
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
    sitemap(),
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
